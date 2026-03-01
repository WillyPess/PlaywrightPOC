import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { users } from '../data/users';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CheckoutStep2Page } from '../../pages/CheckoutStep2Page';

test.describe('Checkout flow', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
  });

  test('Checkout 3 items successfully ', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutStep2Page = new CheckoutStep2Page(page);

    await expect(page).toHaveURL(/inventory.html/);

    await inventoryPage.addItemByIndex(0);
    await inventoryPage.addItemByIndex(1);
    await inventoryPage.addItemByIndex(2);
    await inventoryPage.buttonCart.click();

    await expect(cartPage.cartItem).toHaveCount(3);
    await cartPage.checkout();
    await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
    await checkoutPage.continueCheckout();

    await checkoutStep2Page.finishCheckout();

    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(checkoutStep2Page.thankYouMessage).toBeVisible();
    
    
  },);


});


