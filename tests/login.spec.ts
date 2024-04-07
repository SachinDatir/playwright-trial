import { test, expect } from '@playwright/test';
// test.describe.configure({mode:"parallel"})
test.describe.configure({mode:"serial"}) //skip other test script if first test get failed
test.only('@Orange has title-01', async ({ page }) => {
await page.route('**/*.{jpg,png,jpeg}',route=>route.abort())
    await page.goto('/');
   await page.locator("input[name='username']").fill('Admin')
   await page.locator("input[type='password']").fill('admin123')
   await page.locator('button[type="submit"]').click()
   test.setTimeout(20000)
   await expect(page.locator('[class="oxd-topbar-header-breadcrumb"]')).toBeVisible()
       // Expect a title "to contain" a substring.
    // await expect(page).toHaveTitle(/Playwright/);
  })

test('has title-02 ', async ({ page }) => {
    await page.route('**/*.{jpg,png,jpeg}',route=>route.abort())
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
       await page.locator("input[name='username']").fill('Admin')
       await page.locator("input[type='password']").fill('admin123')
       await page.locator('button[type="submit"]').click()
       test.setTimeout(20000)
       await expect(page.locator('[class="oxd-topbar-header-breadcrumb"]')).toBeVisible()
           // Expect a title "to contain" a substring.
        // await expect(page).toHaveTitle(/Playwright/);
      })

test('has title-03', async ({ page }) => {
        await page.route('**/*.{jpg,png,jpeg}',route=>route.abort())
            await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
           await page.locator("input[name='username']").fill('Admin')
           await page.locator("input[type='password']").fill('admin123')
           await page.locator('button[type="submit"]').click()
           test.setTimeout(20000)
           await expect(page.locator('[class="oxd-topbar-header-breadcrumb"]')).toBeVisible()
               // Expect a title "to contain" a substring.
            // await expect(page).toHaveTitle(/Playwright/);
          })

  