import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const moduleName = process.env.PLAYWRIGHT_MODULE;
const { chromium } = await import(
  moduleName ? pathToFileURL(moduleName).href : "playwright"
);
const browser = await chromium.launch({
  headless: true,
  ...(process.env.BROWSER_EXECUTABLE
    ? { executablePath: process.env.BROWSER_EXECUTABLE }
    : {}),
});
const output = resolve(process.env.QA_OUTPUT || ".qa");
await mkdir(output, { recursive: true });
const url = process.env.PORTFOLIO_URL || "http://127.0.0.1:5173/";
const errors = [];
const settle = (page) => page.evaluate(() => new Promise(resolve => {
  let last = scrollY;
  let stable = 0;
  const tick = () => {
    stable = Math.abs(scrollY - last) < .5 ? stable + 1 : 0;
    last = scrollY;
    if (stable >= 4 && !document.getAnimations().some(a => a.playState === "running")) resolve();
    else requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}));
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error")
      errors.push(message.text() + " at " + message.location().url);
  });
  const response = await page.goto(url, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.locator(".project").count(), 2);
  const labelStyle = await page.locator(".project-category").first().evaluate(element => ({
    transform: getComputedStyle(element).textTransform,
    font: getComputedStyle(element).fontFamily,
  }));
  assert.equal(labelStyle.transform, "none");
  assert.doesNotMatch(labelStyle.font, /mono/i);
  for (const name of ["LinkedIn", "GitHub"]) {
    const social = page.locator(".header-socials").getByRole("link", { name });
    assert.equal(await social.count(), 1);
    assert.ok(await social.isVisible());
    const heroSocial = page.locator(".hero-actions").getByRole("link", { name, exact: true });
    assert.equal(await heroSocial.count(), 1);
    assert.ok(await heroSocial.isVisible());
    assert.equal(await heroSocial.getAttribute("href"), await social.getAttribute("href"));
  }
  for (const project of await page.locator(".project").all()) {
    assert.ok((await project.innerText()).split(/\s+/).length >= 180, "Project case study is too brief");
    assert.equal(await project.locator(".analysis-list dt").count(), 4);
    assert.match(await project.innerText(), /Monte Carlo/);
  }
  assert.equal(
    await page.locator(".training-list").getByText("Innovista").count(),
    0,
  );
  assert.equal(
    await page
      .locator(".experience")
      .getByText("Innovista", { exact: true })
      .count(),
    1,
  );
  assert.match(
    await page.locator(".experience").innerText(),
    /Summer 2026 · 2 months/,
  );
  assert.equal(await page.locator(".experience-list li").count(), 4);
  assert.doesNotMatch(
    await page.locator("main").innerText(),
    /Streamlit|Frontend|Community involvement|Energy × Economics/i,
  );
  const internal = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) => links.map((a) => a.getAttribute("href")));
  for (const href of new Set(internal))
    assert.equal(
      await page.locator(href).count(),
      1,
      "Missing anchor: " + href,
    );
  const external = await page
    .locator('a[target="_blank"]')
    .evaluateAll((links) =>
      links.map((a) => ({
        href: a.href,
        rel: a.rel,
        label: a.getAttribute("aria-label") || a.textContent.trim(),
      })),
    );
  for (const link of external) {
    assert.ok(link.label);
    assert.ok(link.rel.includes("noopener"));
    assert.ok(link.href.startsWith("https://"));
  }
  await page.keyboard.press("Tab");
  assert.equal(
    await page.evaluate(() => document.activeElement.textContent),
    "Skip to content",
  );
  await page.keyboard.press("Enter");
  assert.equal(new URL(page.url()).hash, "#main-content");
  assert.equal(
    await page.evaluate(() => document.activeElement.id),
    "main-content",
  );
  assert.doesNotMatch(
    await page.locator("main").innerText(),
    /one analytical discipline|learning, applied|the reasoning is part|decisions clearer/i,
  );
  await page.getByRole("link", { name: "Background", exact: true }).click();
  await settle(page);
  assert.equal(new URL(page.url()).hash, "#credentials");
  await page.waitForFunction(
    () =>
      document
        .querySelector('a[href="#credentials"]')
        .getAttribute("aria-current") === "location",
  );
  const sectionTop = await page
    .locator("#credentials")
    .evaluate((el) => el.getBoundingClientRect().top);
  const headerBottom = await page
    .locator("header")
    .evaluate((el) => el.getBoundingClientRect().bottom);
  assert.ok(sectionTop >= headerBottom, "Anchor obscured by sticky header");
  await page.screenshot({ path: resolve(output, "background-desktop.png") });
  const results = [];
  for (const width of [
    320, 375, 390, 540, 768, 800, 900, 1024, 1280, 1440, 1920,
  ]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.mouse.move(0, 0);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await settle(page);
    await page.waitForFunction(
      () => !document.querySelector(".nav-links a[aria-current]"),
    );
    const size = await page.evaluate(() => ({
      viewport: innerWidth,
      document: document.documentElement.scrollWidth,
    }));
    assert.ok(
      size.document <= size.viewport,
      "Horizontal overflow at " + width + ": " + JSON.stringify(size),
    );
    const imageBoxes = await page.locator(".project-visual img").evaluateAll(images => images.map(image => {
      const box = image.getBoundingClientRect();
      return { width: box.width, height: box.height };
    }));
    assert.ok(imageBoxes.every(box => box.height <= box.width * 1.2), "Project image is excessively tall at " + width);
    results.push({ width, overflow: false });
    const heroActions = await page.locator(".hero-actions a").evaluateAll(items => items.map(item => {
      const box = item.getBoundingClientRect();
      return { height: box.height, top: box.top, right: box.right };
    }));
    assert.ok(heroActions.every(box => box.height >= 48 && box.right <= width), "Hero button sizing");
    if (width >= 1101) assert.ok(heroActions.every(box => Math.abs(box.top - heroActions[0].top) < 2), "Hero buttons must be beside each other on desktop");
    if ([390, 1440].includes(width)) {
      await page.screenshot({
        path: resolve(output, "hero-" + width + ".png"),
        animations: "disabled",
      });
      for (const selector of [
        "#greeninvest",
        "#energy-simulator",
        "#method",
        "#credentials",
      ]) {
        await page
          .locator(selector)
          .evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
        await settle(page);
        const activeSection =
          selector === "#method"
            ? "method"
            : selector === "#credentials"
              ? "credentials"
              : "work";
        await page.waitForFunction(
          (id) =>
            document
              .querySelector(".nav-links a[aria-current]")
              ?.getAttribute("href") ===
            "#" + id,
          activeSection,
        );
        await page.screenshot({
          path: resolve(output, selector.slice(1) + "-" + width + ".png"),
          fullPage: false,
          animations: "disabled",
        });
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await settle(page);
      await page.waitForFunction(
        () => !document.querySelector(".nav-links a[aria-current]"),
      );
      await page.screenshot({
        path: resolve(output, "full-" + width + ".png"),
        fullPage: true,
        animations: "disabled",
      });
    }
  }
  const images = await page.locator("main img").evaluateAll((imgs) =>
    imgs.map((img) => ({
      src: img.getAttribute("src"),
      loaded: img.complete && img.naturalWidth > 0,
      alt: img.alt,
    })),
  );
  assert.equal(images.length, 2);
  assert.ok(images.every((img) => img.loaded && img.alt));
  await page.emulateMedia({ reducedMotion: "reduce" });
  const transition = await page
    .locator(".button")
    .first()
    .evaluate((el) => getComputedStyle(el).transitionDuration);
  assert.equal(transition, "0s");
  const touch = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await touch.goto(url, { waitUntil: "networkidle" });
  const touchTargets = await touch
    .locator(".nav-links > a")
    .evaluateAll((items) =>
      items.map((el) => el.getBoundingClientRect().height),
    );
  assert.ok(
    touchTargets.every((height) => height >= 44),
    "Mobile navigation tap targets are too short",
  );
  const mobileActions = await touch.locator(".project-actions .button").evaluateAll(items => items.map(el => ({
    width: el.getBoundingClientRect().width,
    height: el.getBoundingClientRect().height,
    container: el.parentElement.getBoundingClientRect().width,
  })));
  assert.ok(mobileActions.every(action => action.height >= 48 && Math.abs(action.width - action.container) < 2), "Mobile project actions should be full-width, comfortable tap targets");
  await touch.getByRole("link", { name: "Approach", exact: true }).tap();
  await settle(touch);
  await touch.waitForFunction(
    () =>
      document
        .querySelector('a[href="#method"]')
        .getAttribute("aria-current") === "location",
  );
  assert.ok(
    await touch
      .locator("#method")
      .evaluate(
        (el) =>
          el.getBoundingClientRect().top >=
          document.querySelector("header").getBoundingClientRect().bottom,
      ),
  );
  await touch.close();
  assert.deepEqual(errors, []);
  console.log(
    JSON.stringify(
      {
        passed: true,
        results,
        images,
        externalLinks: external,
        errors,
        screenshots: output,
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
