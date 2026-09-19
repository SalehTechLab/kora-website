---
name: playwright-cli
description: Use Playwright's command-line tools (via `npx playwright`) for one-off browser automation - opening a URL and taking a screenshot, generating a PDF of a page, recording a script with codegen, running and debugging tests, or opening the HTML report / trace viewer. Use when asked to "screenshot this page", "open the site in a browser", "generate a PDF", "record a playwright script", "run the playwright tests", "debug a failing test", or "show me the trace/report".
---

# Playwright CLI

Drive Playwright straight from the shell with `npx playwright <command>` - no test file required for quick one-off actions. Browsers must be installed once per machine:

```bash
npx playwright install            # all browsers
npx playwright install chromium   # just one
```

## Quick one-off actions

Screenshot a page (add `--device "iPhone 14"` to emulate a device, `--viewport-size "1280,800"` to set size):

```bash
npx playwright screenshot https://example.com screenshot.png
npx playwright screenshot --full-page https://example.com full.png
```

Render a page to PDF (Chromium only):

```bash
npx playwright pdf https://example.com out.pdf
```

Open a live, inspectable browser window pointed at a URL (useful for manually checking a change rendered):

```bash
npx playwright open https://example.com
npx playwright open --device "iPhone 14" https://example.com
```

## Recording a script (codegen)

Launches a browser and a companion Inspector window; every click/fill/navigation is recorded as Playwright code in real time. Stop by closing the browser.

```bash
npx playwright codegen https://example.com
npx playwright codegen --target javascript -o script.js https://example.com
```

Use this when the user wants a repeatable script for a flow (login, checkout, form submission) rather than a one-off screenshot.

## Running tests

Requires an existing Playwright test project (`playwright.config.ts` + spec files under e.g. `tests/`):

```bash
npx playwright test                        # run all tests headless
npx playwright test path/to/file.spec.ts   # run one file
npx playwright test -g "test name"         # filter by title
npx playwright test --headed               # watch it run in a real window
npx playwright test --debug                # step through with the Inspector
npx playwright test --ui                   # interactive UI mode (time travel, watch)
```

After a run, open the HTML report (auto-opens on failure by default, or force it):

```bash
npx playwright show-report
```

## Inspecting a trace

If a test config has `trace: 'on'` / `'retain-on-failure'`, a `.zip` trace is written per test. Open it with:

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

The trace viewer shows a timeline, DOM snapshots per action, console/network logs - use it to diagnose a failing or flaky test rather than re-running blind.

## Notes

- Check whether `playwright` is already a project dependency (`package.json`) before assuming a global install; `npx` will fetch it on demand either way but the installed browser binaries are cached separately (`npx playwright install`).
- Prefer `codegen` when the goal is to produce reusable automation code, and the bare `screenshot`/`pdf`/`open` commands for a single quick look at a page.
- For debugging an existing test suite, reach for `--debug`/`--ui`/`show-trace` before adding print statements.
