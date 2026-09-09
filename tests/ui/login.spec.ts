import { test } from '@fixtures/test-fixtures';
import { users } from '@data/users';

test.describe('Login Tests', () => {

    test('user can login successfully', async ({ 
        loginPage,
        page,
    }) => {

        await loginPage.navigate();
        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );

        await loginPage.expectToHaveURL('inventory.html');
    });

    test('user cannot login with invalid credentials', async ({ loginPage }) => {

        await loginPage.navigate();
        await loginPage.login(
            users.invalidUser.username,
            users.invalidUser.password
        );

        await loginPage.expectErrorMessageVisible();
    });

    test('user cannot login with empty credentials', async ({ loginPage }) => {

        await loginPage.navigate();
        await loginPage.login('','');

        await loginPage.expectErrorMessageVisible();
    });
});