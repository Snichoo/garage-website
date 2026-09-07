# Scrolling regressions

Install the test browsers once:

```sh
npx playwright install chromium webkit
```

Run against a local development server (started automatically on port 3100):

```sh
npm run test:e2e
```

To verify the production build, run `npm run build` and
`npm run start -- --port 3100`, then run the suite in another terminal with
`PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100`. In PowerShell:

```powershell
$env:PLAYWRIGHT_BASE_URL = 'http://127.0.0.1:3100'
npm run test:e2e
```

The suite uses Android/Chromium and iPhone/WebKit emulation. It checks interrupted
review dragging, vertical and horizontal scrolling, menu and quote dismissal,
screen resizing, tab lifecycle recovery, passive map scrolling, map focus, and
content visibility on the home and service pages. Quote drafts are never sent.
Off-origin requests are blocked to avoid analytics and external network flakiness.

Chromium exercises native touch sequences through CDP. Mobile WebKit checks
document scrolling with PageDown and map hit testing: its Playwright driver does
not support wheel input or equivalent multi-point touch sequences. Visibility
and persisted page restoration events are dispatched
explicitly because headless tab/window focus does not reliably suspend pages.
These checks complement testing on a physical phone.
