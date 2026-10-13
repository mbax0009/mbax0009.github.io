import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_EXECUTABLE });
const url = process.env.PORTFOLIO_URL || "http://127.0.0.1:5173/";
const settle = page => page.waitForFunction(() => !document.getAnimations().some(a => a.playState === "running"));
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.getAnimations().some(a => a.effect?.getTiming().duration === 620));
  const reveal = await page.evaluate(() => document.getAnimations().find(a => a.effect?.getTiming().duration === 620)?.effect.getKeyframes());
  assert.ok(reveal.some(frame => frame.transform === "translateY(14px)"));
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => document.documentElement.dataset.input), "keyboard");
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), "auto");
  assert.equal(await page.evaluate(() => document.getAnimations().filter(a => a.playState === "running").length), 0);

  await page.getByRole("link", { name: "Background", exact: true }).focus();
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => Math.abs(document.querySelector("#credentials").getBoundingClientRect().top - 110) < 2);
  assert.equal(new URL(page.url()).hash, "#credentials");

  await page.getByRole("link", { name: "Projects", exact: true }).click();
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), "smooth");
  await page.waitForFunction(() => Math.abs(document.querySelector("#work").getBoundingClientRect().top - 110) < 2);
  await settle(page);
  assert.equal(new URL(page.url()).hash, "#work");
  await page.getByRole("link", { name: "Try GreenInvest", exact: true }).hover();
  await settle(page);
  const arrowTransform = await page.getByRole("link", { name: "Try GreenInvest", exact: true }).locator("svg").evaluate(el => getComputedStyle(el).transform);
  assert.match(arrowTransform, /2, -2/);
  await page.keyboard.press("Shift");
  assert.equal(await page.evaluate(() => document.documentElement.dataset.input), "keyboard");
  await page.mouse.move(100, 300);
  assert.equal(await page.evaluate(() => document.documentElement.dataset.input), "pointer");
  await page.locator(".download-link").first().hover();
  await settle(page);
  assert.match(await page.locator(".download-link svg").first().evaluate(el => getComputedStyle(el).transform), /0, 3/);

  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), "auto");
  assert.equal(await page.locator(".button").first().evaluate(el => getComputedStyle(el).transitionDuration), "0s");
  assert.equal(await page.getByRole("link", { name: "Try GreenInvest", exact: true }).locator("svg").evaluate(el => getComputedStyle(el).transform), "none");
  await page.getByRole("link", { name: "Background", exact: true }).click();
  await page.waitForFunction(() => Math.abs(document.querySelector("#credentials").getBoundingClientRect().top - 110) < 2);
  assert.equal(await page.evaluate(() => document.getAnimations().filter(a => a.playState === "running").length), 0);

  await page.goto(url + "#credentials", { waitUntil: "networkidle" });
  assert.ok(await page.locator("#credentials").evaluate(el => el.getBoundingClientRect().top >= document.querySelector("header").getBoundingClientRect().bottom));
  assert.deepEqual(errors, []);
  console.log("PASS: one-time reveals, keyboard/mouse switching, smooth pointer anchors, directional hover feedback, reduced motion, deep links, and no page errors.");
} finally {
  await browser.close();
}
