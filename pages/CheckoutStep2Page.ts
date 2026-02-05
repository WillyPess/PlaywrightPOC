import { Page, Locator } from '@playwright/test';

// Page Object Model for the Inventory Page
export class CheckoutStep2Page {
  readonly page: Page;
  readonly finishButton: Locator;
  readonly thankYouMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.locator('[data-test="finish"]');
    this.thankYouMessage = page.locator('[data-test="complete-header"]')
  }

// accessible methods
async finishCheckout() {
    await this.finishButton.click();
}

async getThankYouMessage() {
    return await this.thankYouMessage.textContent();
}
}
