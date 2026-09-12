import { test } from '@fixtures/test-fixtures';
import { products } from '@data/products';
import { CartPage } from '@pages/CartPage';

test.describe('Cart', () => {
    test('user can remove a product from cart @regression', async ({
        productsPage,
        cartPage
    }) => {

        await productsPage.navigate();
        await productsPage.expectPageLoaded();

        await productsPage.addProductToCart(products.bikeLight);
        await productsPage.openCart();
        await cartPage.expectProductInCart(products.bikeLight);

        await cartPage.removeProductFromCart(products.bikeLight);
        await cartPage.expectCartIsEmpty();
    })
})