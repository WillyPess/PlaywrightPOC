import { Page, Locator } from '@playwright/test';

// Page Object Model for the Login Page
export class CartPage {
  readonly page: Page;
  readonly cartItem: Locator;
  readonly removeButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.removeButton = page.locator('button[data-test^="remove-"]');
    this.cartItem = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]')
  }

  // accessible methods
  async removeFirstItem() {
    await this.removeButton.first().click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }   
}
