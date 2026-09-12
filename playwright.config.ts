import { defineConfig, devices } from '@playwright/test';
import { config } from './config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: config.uiBaseURL,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    {
        name: 'api',
        testMatch: /tests[\\/]api[\\/].*\.spec\.ts/,
    },

    {
        name: 'chromium',
        testIgnore: /tests[\\/]api[\\/].*\.spec\.ts/,
        use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json' },
        dependencies: ['setup'],
    },
    {
        name: 'firefox',
        testIgnore: /tests[\\/]api[\\/].*\.spec\.ts/,
        use: { ...devices['Desktop Firefox'], storageState: 'playwright/.auth/user.json' },
        dependencies: ['setup'],
    },
    {
        name: 'webkit',
        testIgnore: /tests[\\/]api[\\/].*\.spec\.ts/,
        use: { ...devices['Desktop Safari'], storageState: 'playwright/.auth/user.json' },
        dependencies: ['setup'],
    },
],
});