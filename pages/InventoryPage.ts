import { Page, Locator } from '@playwright/test';

// Page Object Model for the Inventory Page
export class InventoryPage {
  readonly page: Page;
  readonly inventoryItem: Locator;
  readonly buttonFilter: Locator;
  readonly addToCartButton: Locator;
  readonly buttonCart: Locator;
  readonly itemPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItem = page.locator('.inventory_item');
    this.buttonFilter = page.locator('.product_sort_container');
    this.addToCartButton = page.locator('button[data-test^="add-to-cart"]');
    this.buttonCart = page.locator('.shopping_cart_link');
    this.itemPrice = page.locator('.inventory_item_price');
  }

// accessible methods
  async inventory() {
    await this.inventoryItem.click;
    await this.buttonFilter.click;
  }

async addItemByIndex(index: number) {
    await this.addToCartButton.nth(index).click();
}

async getPriceByIndex(index: number): Promise<number> {
    const priceText = await this.itemPrice.nth(index).innerText();
    return parseFloat(priceText.replace('$', ''));
}

  async gotoCart() {
    await this.buttonCart.click;
  }
}
