# Playwright Enterprise Framework

![Playwright Tests](https://github.com/je-lagman/playwright-enterprise-framework/actions/workflows/playwright.yml/badge.svg)

A scalable Playwright + TypeScript automation framework demonstrating the patterns used to build and maintain test suites at scale: Page Object Model, composable fixtures, environment-driven configuration, an API testing layer, tagged test suites, and CI integration.

This project is built against two public demo targets — [SauceDemo](https://www.saucedemo.com) for UI tests and [ReqRes](https://reqres.in) for API tests — so it can be cloned and run by anyone without needing access to a real application.

## What this demonstrates

- **Page Object Model** with fixtures composing page objects, rather than a base-page inheritance chain
- **Authenticated test runs via `storageState`**, using a dedicated `setup` project so login only happens once per run, with tests able to opt out for unauthenticated scenarios
- **A typed API client layer** (`ApiClient` → `UsersAPI`) with centralized headers, environment-driven base URLs, and automatic retry on rate-limiting (429) responses
- **Environment-driven configuration** (`config/env.ts` + `.env`) instead of hardcoded URLs or secrets
- **Tagged test suites** (`@smoke`, `@regression`) so CI or a developer can run a fast subset instead of the full suite
- **CI integration** via GitHub Actions, with HTML report artifacts uploaded on every run (pass or fail)

## Tech stack

- [Playwright](https://playwright.dev/) (`@playwright/test`)
- TypeScript (strict mode)
- GitHub Actions
- dotenv for environment configuration

## Project structure

```
├── .github/workflows/     # CI pipeline definition
├── api/                   # Thin HTTP client + endpoint-specific API wrappers
├── config/                # Environment resolution (TEST_ENV, base URLs, API keys)
├── fixtures/              # Custom Playwright fixtures composing page objects
├── pages/                 # Page Object Model classes
├── test-data/             # Static and generated test data
├── tests/
│   ├── api/               # API-only tests, isolated to their own Playwright project
│   ├── auth/              # Auth setup project (produces storageState)
│   └── ui/                # UI test specs
├── utils/                 # Logger and random test-data generators
└── playwright.config.ts   # Projects, retries, reporters, browser matrix
```

## Getting started

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps

# Copy the env template and add your own ReqRes API key
cp .env.example .env
```

`ReqRes` now requires an API key on every request. Sign up for a free key at [reqres.in/signup](https://reqres.in/signup) and set it in `.env`:

```
TEST_ENV=local
REQRES_API_KEY=your_key_here
```

Then run the suite:

```bash
npm test
```

## Available scripts

| Script | Description |
| --- | --- |
| `npm test` | Run the full suite across all projects |
| `npm run test:headed` | Run with a visible browser |
| `npm run test:debug` | Run in Playwright's debug mode |
| `npm run test:report` | Open the last HTML report |
| `npm run test:chrome` | Run only the `chromium` project |
| `npm run test:firefox` | Run only the `firefox` project |
| `npm run test:webkit` | Run only the `webkit` project |
| `npm run test:smoke` | Run only tests tagged `@smoke` |
| `npm run test:regression` | Run only tests tagged `@regression` |

## Design decisions

**Fixtures over inheritance.** Page objects are instantiated inside custom fixtures (`fixtures/test-fixtures.ts`) rather than through a shared base-page class. This keeps each test's dependencies explicit in its parameter list and avoids the deep inheritance chains that make large POM suites hard to navigate.

**A separate `setup` project for authentication.** `tests/auth/auth.setup.ts` logs in once and saves `storageState`, which every UI project depends on. `tests/ui/login.spec.ts` explicitly overrides `storageState` to an empty state where it needs to test the unauthenticated login flow itself — the framework supports both authenticated and unauthenticated scenarios without duplicating login logic.

**API tests run as their own Playwright project.** Early on, API specs were being picked up by every browser project (chromium, firefox, webkit), which meant each API test executed three times per run — enough to trip ReqRes' rate limiting on its own. `tests/api/*.spec.ts` now runs under a dedicated `api` project, excluded from the browser projects via `testIgnore`, so each API test runs exactly once regardless of how many browsers are configured.

**Configuration and secrets are resolved through `config/env.ts`.** Base URLs and the ReqRes API key come from environment variables rather than being hardcoded, and `.env` is git-ignored. `.env.example` documents the expected variables without exposing real values.

**Retry on transient rate limiting.** `ApiClient` retries a request up to twice with a short backoff if it receives a 429, so a momentary rate-limit response doesn't fail the whole suite outright.

## CI

The workflow in `.github/workflows/playwright.yml` runs on every push and pull request to `main`/`master`:

1. Installs dependencies and Playwright browsers
2. Runs the full suite (with `REQRES_API_KEY` injected from a GitHub Actions secret)
3. Uploads the HTML report as a build artifact, whether the run passes or fails

Failed tests automatically capture a screenshot, video, and trace, viewable via `npx playwright show-trace` on the downloaded artifact.

## Known limitations / next steps

- SauceDemo and ReqRes are fixed public demo targets, so the `local`/`staging`/`prod` environment split in `config/env.ts` is illustrative of the pattern rather than pointing at distinct real environments
- Auth setup covers a single user persona; a real suite would extend this to multiple roles (e.g. admin vs. standard user)
- No visual regression or accessibility checks yet
- API test coverage is happy-path only; no negative-path assertions (e.g. 404s, malformed payloads) yet

## License

MIT
