import { test } from '@fixtures/test-fixtures';
import { users } from '@data/users';
import { products } from '@data/products';
import { checkoutData } from '@data/checkout';

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
            users.standardUser.username,
            users.standardUser.password
        );

        //Products
        await productsPage.expectPageLoaded();

        await productsPage.addProductToCart(
            products.backpack
        );

        await productsPage.expectCartItemCount(1);

        //Cart
        await productsPage.openCart();

        await cartPage.expectPageLoaded();

        await cartPage.expectProductInCart(
            products.backpack
        );

        await cartPage.checkout();

        //Checkout
        await checkoutPage.enterCustomerInformation(
            checkoutData.validCustomer.firstName,
            checkoutData.validCustomer.lastName,
            checkoutData.validCustomer.postalCode
        );

        await checkoutPage.continue();

        await checkoutPage.finish();

        //Validation
        await checkoutPage.expectConfirmationMessage();
    })
});