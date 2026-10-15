# Raymon Castano portfolio

One-page, light editorial portfolio built with static HTML, CSS, JavaScript and a Node build.

## Local use

Requires Node 22.19+ (tested with Node 24).

```sh
npm ci
npm run build
npm run preview
```

Open http://127.0.0.1:4173/. The server binds only to loopback. Stop with Ctrl+C. Use `npm run dev` for source watching; refresh the browser after changes. Do not open the source HTML directly: the build inserts the project content.

## Content and assets

- `index.html`: page template, biography, service and contact copy.
- `data.js`: ten detailed case studies, retained from the existing portfolio.
- `build.js`: selected-project summaries and generated project markup.
- `style.css`: design tokens, responsive layouts and reduced-motion rules.
- `script.js`: navigation, native dialogs, history and contact UI.
- `contact.js`: validation, webhook contract and local-only simulation.
- `npm run assets`: regenerate WebP previews and social image from original assets.
- Fonts are self-hosted in `assets/fonts`, with OFL licenses.

## Safe form testing

All loopback submissions are simulated and never invoke the production webhook. Use fictitious details:

- `/`: simulated success.
- `/?form-test=error#contact`: simulated server failure.
- `/?form-test=timeout#contact`: simulated 15-second timeout.

Name and email are required. Company, phone and message remain optional. The `website` honeypot remains in the payload. Production uses the existing endpoint and all six original field names. Production delivery/CORS has deliberately not been tested. Without JavaScript, use the visible email link; the submit button remains disabled.

## Checks

```sh
npm test
npm run build
npm run audit
```

Lighthouse requires Chrome and a running preview. Reports and screenshots are in ignored `artifacts/`. See `AUDIT.md` for results and limitations. Windows may report a temporary-profile cleanup warning after Lighthouse has saved its reports.

## Publication

Build with `npm ci` and `npm run build`, then publish the generated `dist/` directory. Do not serve the repository root: its HTML contains build placeholders. Keep the four legacy route directories: each redirects to its matching homepage anchor and includes a fallback link. Case studies use `#case-<project-id>` share links.
