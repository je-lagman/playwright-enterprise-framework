import { test } from '@fixtures/test-fixtures';

test.describe('Checkout process', () => {
   
    test('user can complete checkout process', async ({
        loginPage,
        productsPage,
        cartPage,
        checkoutPage
    }) => {

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