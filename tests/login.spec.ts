import { test, expect } from '@playwright/test';
test('has title', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
   await page.locator("input[name='username']").fill('Admin')
   await page.locator("input[type='password']").fill('admin123')
   await page.locator('button[type="submit"]').click()
   test.setTimeout(20000)
   await expect(page.locator('[class="oxd-topbar-header-breadcrumb"]')).toBeVisible()
       // Expect a title "to contain" a substring.
    // await expect(page).toHaveTitle(/Playwright/);
  })