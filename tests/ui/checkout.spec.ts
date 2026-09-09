import { test } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { ProductsPage } from '@pages/ProductsPage';
import { CartPage } from '@pages/CartPage';
import { CheckoutPage } from '@pages/CheckoutPage';

test.describe('Checkout process', () => {
   
    test('user can complete checkout process', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        //Login
        await loginPage.navigate();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        //Products
        await productsPage.expectPageLoaded();

        await productsPage.addProductToCart(
            'Sauce Labs Backpack'
        );

        await productsPage.expectCartItemCount(1);

        //Cart
        await productsPage.openCart();

        await cartPage.expectPageLoaded();

        await cartPage.expectProductInCart(
            'Sauce Labs Backpack'
        );

        await cartPage.checkout();

        //Checkout
        await checkoutPage.enterCustomerInformation(
            'Jerome',
            'Lagman',
            '2000'
        );

        await checkoutPage.continue();

        await checkoutPage.finish();

        //Validation
        await checkoutPage.expectConfirmationMessage();
    })
});