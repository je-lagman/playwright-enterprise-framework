import { expect, type Locator, type Page } from '@playwright/test'

export class ProductsPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly shoppingCart: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;

        this.pageTitle = page.getByText('Products');
        this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async expectPageLoaded(): Promise<void> {
        await expect(this.pageTitle).toBeVisible();
    }

    async addProductToCart(productName: string): Promise<void> {
        const product = this.page
        .locator('.inventory_item')
        .filter({ hasText: productName });

        await product.getByRole('button', { name: 'Add to cart' }).click();
    }

    async openCart(): Promise<void> {
        await this.shoppingCart.click();
    }

    async expectCartItemCount(count: number): Promise<void> {
        await expect(this.cartBadge).toHaveText(String(count));
    }
}