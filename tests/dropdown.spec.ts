import { test } from "@playwright/test";
test("Validate the playwright dropdown functionality", async ({ page }) => {
  await page.goto("https://letcode.in/dropdowns");
  await page.locator("#fruits").selectOption("4");
  test.setTimeout(20000);
  await page.locator('[class="notification is-success"]').isVisible();
  test.setTimeout(20000);
});

test("Verify the Dynyamic Dropdown", async ({ page }) => {
  await page.goto("https://www.redbus.in/");
  await page.locator("#src").fill("Pune");
  await page
    .locator('ul[class="sc-dnqmqq eFEVtU"]>li')
    .filter({ hasText: "Swargate" })
    .click();
  test.setTimeout(20000);

  await page.locator("#dest").fill("Hyd");
  await page
    .locator('ul[class="sc-dnqmqq eFEVtU"]>li')
    .filter({ hasText: "Kukatpally" })
    .click();
  await page.pause();
});

test.only("another way to handle dynamic dropdown", async ({ page }) => {
  await page.goto("https://www.redbus.in/");
  await page.locator("#src").fill("Pune");
//   await page.locator("#dest").fill("Mumbai");
  await page.waitForSelector('.placeHolderMainText');
  let count = await page.locator('.placeHolderMainText').count();
  console.log(count);
  for (let i = 0; i < count; i++) {
    let text: any = await page
      .locator('.placeHolderMainText')
      .nth(i)
      .textContent();
    if (text == "Shivaji Nagar") {
      await page.locator('.placeHolderMainText').nth(i).click();
      break;
    }
  }
//   await page.pause();

  page.waitForTimeout(2000)
  await page.locator("#dest").fill("Mum");
  await page.waitForSelector('ul[class="sc-dnqmqq eFEVtU"]>li>div>text');
  let countToGo = await page.locator('ul[class="sc-dnqmqq eFEVtU"]>li>div>text').count();
  console.log(countToGo);
  for (let i = 0; i < countToGo; i++) {
    let text: any = await page
      .locator('.placeHolderMainText')
      .nth(i)
      .textContent();
    if (text == "Kurla") {
      await page.locator('.placeHolderMainText').nth(i).click();
      break;
    }
  }
  await page.pause()

});
