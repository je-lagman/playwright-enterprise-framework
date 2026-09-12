import { test } from '@fixtures/test-fixtures';
import { products } from '@data/products';
import { checkoutData } from '@data/checkout';

test.describe('Checkout process ', () => {
   
    test('user can complete checkout process @smoke @regression', async ({
        productsPage,
        cartPage,
        checkoutPage
    }) => {

        //Products
        await productsPage.navigate();

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
   
    test('user cannot complete checkout process with empty checkout form @smoke @regression', async ({
        productsPage,
        cartPage,
        checkoutPage
    }) => {

        //Products
        await productsPage.navigate();

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

        await checkoutPage.continue();

        //Validation
        await checkoutPage.expectErrorMessage();
    })
});