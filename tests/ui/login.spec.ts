import { test } from '@fixtures/test-fixtures';
import { users } from '@data/users';
import { LoginPage } from '@pages/LoginPage';

test.use({
    storageState: {
        cookies: [],
        origins: [],
    },
});

test.describe('Login Tests', () => {

    test('user can login successfully @smoke @regression', async ({ 
        loginPage,
    }) => {

        await loginPage.navigate();
        await loginPage.login(
            users.standard.username,
            users.standard.password
        );

        await loginPage.expectLandingPage();
    });

    test('user cannot login with invalid credentials @regression', async ({ loginPage }) => {

        await loginPage.navigate();
        await loginPage.login(
            users.invalid.username,
            users.invalid.password
        );

        await loginPage.expectErrorMessageVisible();
    });

    test('user cannot login with empty credentials @regression', async ({ loginPage }) => {

        await loginPage.navigate();
        await loginPage.login('','');

        await loginPage.expectErrorMessageVisible();
    });

    test('user cannot login using locked out credentials @regression', async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.login(
            users.locked_out.username,
            users.locked_out.password
        );

        await loginPage.expectErrorMessageVisible();
    });
});