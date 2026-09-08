import { test, expect } from '@playwright/test';

test('SauceDemo application is accessible', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Swag Labs/);
});