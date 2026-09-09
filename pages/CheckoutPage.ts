import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly confirmationMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');

        this.continueButton = page.getByRole('button', {
            name: 'Continue'
        });

        this.finishButton = page.getByRole('button', {
            name: 'Finish'
        });

        this.confirmationMessage = page.getByText(
            'Thank you for your order!'
        );
    }

    async enterCustomerInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continue(): Promise<void> {
        await this.continueButton.click();
    }

    async finish(): Promise<void> {
        await this.finishButton.click();
    }

    async expectConfirmationMessage(): Promise<void> {
        await expect(this.confirmationMessage).toBeVisible();
    }
}