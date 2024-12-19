import { test, expect } from '@playwright/test';

test('Login', async ({ page }) => {
  await page.goto('http://localhost/users/sign_in');
  await page.getByLabel('Username or email').click();
  await page.getByLabel('Username or email').fill('root');
  await page.getByLabel('Username or email').press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('root1234');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.locator('li').filter({ hasText: 'Administrator @root Set' }).getByRole('link').click();
  await expect(page.getByText('Administrator @root')).toBeVisible();
});

