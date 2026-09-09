import { test } from '@fixtures/test-fixtures';

test.describe('Login Tests', () => {

    test('user can login successfully', async ({ 
        loginPage,
        page,
    }) => {

        await loginPage.navigate();
        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        await loginPage.expectToHaveURL('inventory.html');
    });

    test('user cannot login with invalid credentials', async ({ loginPage }) => {

        await loginPage.navigate();
        await loginPage.login(
            'invalid_user',
            'invalid_password'
        );

        await loginPage.expectErrorMessageVisible();
    });

    test('user cannot login with empty credentials', async ({ loginPage }) => {

        await loginPage.navigate();
        await loginPage.login('','');

        await loginPage.expectErrorMessageVisible();
    });
});