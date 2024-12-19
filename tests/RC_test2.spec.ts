import { test, expect } from '@playwright/test';

test('Create Project', async ({ page }) => {
  await page.goto('http://localhost/users/sign_in');
  await page.getByLabel('Username or email').click();
  await page.getByLabel('Username or email').fill('root');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('root1234');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Create a project Projects are' }).click();
  await page.getByLabel('Project name').click();
  await page.getByLabel('Project name').fill('RightCrowd');
  await page.getByRole('button', { name: 'Create project' }).click();
  await page.getByRole('link', { name: 'Settings' }).click();
  await page.locator('#js-project-advanced-settings').getByRole('button', { name: 'Expand' }).click();
  await page.getByRole('button', { name: 'Remove project' }).click();
  await page.locator('#confirm_name_input').click();
  await page.locator('#confirm_name_input').fill('rightcrowd');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to GitLab' })).toBeVisible();
});