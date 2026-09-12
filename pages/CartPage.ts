import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly cartItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.pageTitle = page.getByText('Your Cart');
        this.checkoutButton = page.getByRole('button', { 
            name: 'Checkout' 
        });

        this.continueShoppingButton = page.getByRole('button', {
            name: 'Continue Shopping'
        });
    }

    async expectCartIsEmpty(): Promise<void> {
        await expect(this.cartItems).toHaveCount(0);
    }

    async expectPageLoaded(): Promise<void> {
        await expect(this.pageTitle).toBeVisible();
    }

    async expectProductInCart(productName: string): Promise<void> {
        const product = this.page
        .locator('.cart_item')
        .filter({ hasText: productName });

        await expect(product).toBeVisible();
    }

    async removeProductFromCart(productName: string): Promise<void> {
        const product = this.page
        .locator('.cart_item')
        .filter({ hasText: productName });

        await product.getByRole('button', {
            name: /Remove/ }).click();
    }

    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }
}