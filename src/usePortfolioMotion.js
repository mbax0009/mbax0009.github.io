import { useEffect } from "react";

// Content stays visible by default. Motion enhances entry, never gates access.
export function usePortfolioMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const running = new Set();
    const finish = () => {
      for (const animation of running) animation.finish();
      running.clear();
    };
    const onKeyboard = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      root.dataset.input = "keyboard";
      finish();
    };
    const onPointer = () => {
      if (root.dataset.input !== "pointer") root.dataset.input = "pointer";
    };
    const onPointerMove = event => {
      if (event.pointerType === "mouse" && (event.movementX || event.movementY)) onPointer();
    };
    const onPreference = () => { if (reducedMotion.matches) finish(); };
    // A programmatic / keyboard click must not inherit smooth pointer scrolling.
    const onClick = (event) => {
      if (event.target.closest?.('a[href^="#"]')) {
        root.dataset.input = event.detail === 0 ? "keyboard" : "pointer";
        if (event.detail === 0) finish();
      }
    };
    document.addEventListener("keydown", onKeyboard, true);
    document.addEventListener("pointerdown", onPointer, { passive: true });
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("wheel", onPointer, { passive: true });
    document.addEventListener("click", onClick, true);
    reducedMotion.addEventListener("change", onPreference);

    const targets = document.querySelectorAll([
      ".hero-topline", ".hero-title-wrap", ".hero-intro",
      ".project-heading", ".project-overview", ".project-visual figure",
      ".project-scope", ".analysis-list > div", ".method-intro",
      ".principles article", ".capabilities", ".background-heading",
      ".background-row", ".footer-top",
    ].join(","));
    const observer = new IntersectionObserver((entries) => {
      let stagger = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (reducedMotion.matches || root.dataset.input === "keyboard") continue;
        const animation = entry.target.animate(
          [
            { opacity: 0.18, transform: "translateY(14px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 620,
            delay: Math.min(stagger++ * 45, 135),
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "backwards",
          },
        );
        running.add(animation);
        const clear = () => running.delete(animation);
        animation.addEventListener("finish", clear, { once: true });
        animation.addEventListener("cancel", clear, { once: true });
      }
    }, { threshold: 0.06, rootMargin: "0px 0px -28px 0px" });
    targets.forEach(target => observer.observe(target));
    return () => {
      observer.disconnect();
      for (const animation of running) animation.cancel();
      running.clear();
      document.removeEventListener("keydown", onKeyboard, true);
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("wheel", onPointer);
      document.removeEventListener("click", onClick, true);
      reducedMotion.removeEventListener("change", onPreference);
      delete root.dataset.input;
    };
  }, []);
}
