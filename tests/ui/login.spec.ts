import { test } from '@fixtures/test-fixtures';
import { users } from '@data/users';

test.use({
    storageState: {
        cookies: [],
        origins: [],
    },
});

test.describe('Login Tests', () => {

    test('user can login successfully', async ({ 
        loginPage,
    }) => {

        await loginPage.navigate();
        await loginPage.login(
            users.standard.username,
            users.standard.password
        );

        await loginPage.expectToHaveURL('inventory.html');
    });

    test('user cannot login with invalid credentials', async ({ loginPage }) => {

        await loginPage.navigate();
        await loginPage.login(
            users.invalid.username,
            users.invalid.password
        );

        await loginPage.expectErrorMessageVisible();
    });

    test('user cannot login with empty credentials', async ({ loginPage }) => {

        await loginPage.navigate();
        await loginPage.login('','');

        await loginPage.expectErrorMessageVisible();
    });
});