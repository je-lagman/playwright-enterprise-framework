import { test } from '@fixtures/test-fixtures';

test.describe('Products Page', () => {

    test('user can add products to cart', async ({ loginPage, productsPage }) => {

        await loginPage.navigate();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        await productsPage.expectPageLoaded();

        await productsPage.addProductToCart(
            'Sauce Labs Backpack'
        );

        await productsPage.expectCartItemCount(1);
    });
});