import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Products Page', () => {

    test('user can add products to cart', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

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