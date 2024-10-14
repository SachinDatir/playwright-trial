import { test, expect, chromium } from "@playwright/test";
// test.describe.configure({mode:"parallel"})
test.describe.configure({ mode: "serial" }); //skip other test script if first test get failed
test("@Orange has title-01", async ({ page }) => {
  await page.route("**/*.{jpg,png,jpeg}", (route) => route.abort());
  await page.goto("/");
  await page.locator("input[name='username']").fill("Admin");
  await page.locator("input[type='password']").fill("admin123");
  await page.locator('button[type="submit"]').click();
  test.setTimeout(20000);
  await expect(
    page.locator('[class="oxd-topbar-header-breadcrumb"]')
  ).toBeVisible();
  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
});

test("has title-02 ", async ({ page }) => {
  await page.route("**/*.{jpg,png,jpeg}", (route) => route.abort());
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page.locator("input[name='username']").fill("Admin");
  await page.locator("input[type='password']").fill("admin123");
  await page.locator('button[type="submit"]').click();
  test.setTimeout(20000);
  await expect(
    page.locator('[class="oxd-topbar-header-breadcrumb"]')
  ).toBeVisible();
  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
});


test.only("has title-03", async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    let loginResponse
    // Intercept the login request


    await page.goto("https://rahulshettyacademy.com/client", {
        waitUntil: "load",
    });

    await page.locator('#userEmail').fill('sdatir83@gmail.com');
    await page.locator("#userPassword").fill('Password1!');

     await page.locator('input[type="submit"]').click();
    // await Promise.all([
    //     page.waitForNavigation(), // Wait for navigation caused by the click
    //     loginButton.click()
    // ]);
    await page.route('**/api/ecom/auth/login', async route => {
      const response = await route.request().response()
      if (response) {
          loginResponse = await response.json();
          console.log('Intercepted login request:', route.request().url());
      } else {
          console.log('No response received for the intercepted login request');
      }
        console.log('Intercepted login request:', route.request().url());
        route.continue(); // Allow the request to continue as usual
    });
    // Wait for an element that indicates successful login
    await page.waitForSelector('[class="logo"]', { state: 'visible' });

    // Assertions
    await expect(page.locator('[class="logo"]')).toBeVisible();
    const responseBody = await loginResponse.json();
    console.log('Intercepted response:', responseBody);

    // await browser.close();
});

