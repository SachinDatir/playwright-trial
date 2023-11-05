import { test, expect } from "@playwright/test";
test("TC-01 iframe functionality of plawright", async ({ page }) => {
  await page.goto("https://letcode.in/frame");
  let firstName: any = await page
    .frameLocator("#firstFr")
    .locator('input[name="fname"]');
  let lastName: any = await page
    .frameLocator("#firstFr")
    .locator('input[name="lname"]');
  let email: any = await page
    .frameLocator("#firstFr")
    .locator('input[name="email"]');
  await firstName.fill("Sachin");
  await lastName.fill("Datir");
  await email.fill("sachin@gmail.com");
  await page.waitForTimeout(2000);
});

test.only("2nd way to handle frame is playwright", async ({ page }) => {
  let firstName: any = 'input[placeholder="Enter name"]';
  let lastName: any = 'input[name="lname"]';
  let email: any =  'input[name="email"]';
//   await page.goto("https://letcode.in/frame");
//   const frame = await page.frame({ url: "https://letcode.in/frameUI" });
//   await frame.locator(firstName).fill("sachin");
//   await frame.locator(lastName).fill("sachin");
//   await frame.locator(email).fill("sachin");
//   await page.waitForTimeout(2000);

  await page.goto('https://letcode.in/frame')
  const frame = await page.frame({url:"https://letcode.in/frameUI"})
  await frame?.locator(firstName).fill('sachin')
  await frame?.locator(lastName).fill('Datir')
  // await frame?.locator(email).fill('skd@gmail.com')
  await page.frameLocator('[src="innerFrame"]').locator(email).fill('123')

  await expect(frame.locator('input[placeholder="Enter name"]')).toBeVisible()
  await page.waitForTimeout(2000)
});
