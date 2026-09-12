import { test } from '@fixtures/test-fixtures';
import { products } from '@data/products';

test.describe('Products Page', () => {

    test('user can add products to cart', async ({ productsPage }) => {
        
        await productsPage.navigate();

        await productsPage.expectPageLoaded();

        await productsPage.addProductToCart(
            products.backpack
        );

        await productsPage.expectCartItemCount(1);
    });
});