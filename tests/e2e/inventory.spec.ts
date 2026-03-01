import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { users } from '../data/users';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Inventory Check', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
  });

  test('Successful validation 6 items on inventory', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await expect(page).toHaveURL(/inventory.html/);

    await expect(inventoryPage.inventoryItem).toHaveCount(6);
  });

  test('Order items by value ASC', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await expect(page).toHaveURL(/inventory.html/);

    await inventoryPage.buttonFilter.selectOption('lohi');

    const firstPrice = await inventoryPage.getPriceByIndex(0);
    const lastPrice = await inventoryPage.getPriceByIndex(-1);
    expect(firstPrice).toBeLessThan(lastPrice);
  });

});
