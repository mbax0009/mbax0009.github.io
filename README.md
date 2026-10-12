# Muhammad Bin Asad — Quantitative Energy Portfolio

Source for [mbax0009.github.io](https://mbax0009.github.io/), an editorial portfolio focused on quantitative, explainable energy-decision tools for Pakistan.

## Featured projects

- [GreenInvest Pakistan](https://github.com/mbax0009/GreenInvest-Pakistan) — residential, commercial and industrial solar investment, sizing, bill projections and quotation analysis. [Live calculator](https://greeninvest-pakistan.vercel.app).
- [Pakistan Energy Simulator](https://github.com/mbax0009/Pakistan-Energy-Simulator) — utility-scale solar, wind, and wave techno-economic screening.

## Local development

```bash
npm ci
npm run dev
```

The site is built with React and Vite. Pushes to `main` are deployed automatically through GitHub Pages.

## Verification

`npm run build` produces the static GitHub Pages site. `npm run test:sites` checks the retained hosting adapter.

`node tests/portfolio.browser.mjs` checks content, links, keyboard navigation, image loading, reduced motion and responsive overflow against the local preview. It requires Playwright; optionally provide `PLAYWRIGHT_MODULE` (absolute module path), `BROWSER_EXECUTABLE`, `PORTFOLIO_URL` and `QA_OUTPUT` environment variables. Screenshots are written to `.qa/` by default.
