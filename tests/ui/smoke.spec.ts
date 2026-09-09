import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('SauceDemo application is accessible', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(loginPage.loginButton).toBeVisible();
});