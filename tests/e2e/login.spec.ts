import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { users } from '../data/users';
import { Messages } from '../data/messages';

test.describe('Login flow', () => {

  test('Successful login with valid user', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Login fails with locked user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    await expect(loginPage.errormessage).toBeVisible();
  });

  test('Login with wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.validUser.username, 'senha_errada');

    await expect(loginPage.errormessage).toBeVisible();
    await expect(loginPage.errormessage).toHaveText(Messages.wrongpassword);
  });
});