import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Tests', () => {
    test('user can login successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory.html/);
    });

    test('user cannot login with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate();
        await loginPage.login('invalid_user', 'invalid_password');

        await expect(loginPage.errorMessage).toBeVisible();
    });

    test('user cannot login with empty credentials', async ({ page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate();
        await loginPage.login('','');

        await expect(loginPage.errorMessage).toBeVisible();
    });
});