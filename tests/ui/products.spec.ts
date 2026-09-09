import { test } from '@fixtures/test-fixtures';
import { users } from '@data/users';
import { products } from '@data/products';

test.describe('Products Page', () => {

    test('user can add products to cart', async ({ loginPage, productsPage }) => {

        await loginPage.navigate();

        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );

        await productsPage.expectPageLoaded();

        await productsPage.addProductToCart(
            products.backpack
        );

        await productsPage.expectCartItemCount(1);
    });
});