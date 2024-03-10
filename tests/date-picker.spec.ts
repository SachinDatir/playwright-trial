import { test, expect } from "@playwright/test";
test("TC-01 date picker in playwright", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.locator("#datepicker").fill("01/01/2000");
  await page.waitForTimeout(3000);
});
test("TC-02 datepicker using loop", async ({ page }) => {
  await page.goto("https://www.webdriveruniversity.com/Datepicker/index.html");
  await page.locator("#datepicker").click();
  const year: any = "2025";
  const month: any = "June";
  const day: any = "5";

  while (true) {
    const currentMonthAndYear = await page
      .locator('[class="datepicker-switch"]')
      .first()
      .textContent();
    if (currentMonthAndYear == `${month} ${year}`) {
      break;
    }
    await page.locator('th[class="next"]').first().click();
  }
  const dayCount = await page.locator('[class="day"]').count();
  for (let i = 0; i < dayCount; i++) {
    let dateDay = await page.locator('[class="day"]').nth(i).textContent();
    if (dateDay == day) {
      await page.locator('[class="day"]').nth(i).click();
      break;
    }
  }
  await page.waitForTimeout(4000);
});
test.only("TC-03 datepicker", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.locator("#datepicker").click();
  const year: any = "2024";
  const month: any = "November";
  const day: any = "5";
  let currentTitle = await page
    .locator(".ui-datepicker-title")
    .first()
    .textContent();
  console.log(currentTitle);
  console.log(`${month} ${year}`);
  while (true) {
    const currentMonthAndYear = await page
      .locator(".ui-datepicker-title")
      .first()
      .textContent();
    if (currentMonthAndYear == "November 2024") {
      break;
    }
    await page.locator(".ui-datepicker-next").first().click();
  }
  // const dayCount = await page.locator('[class="day"]').count();
  // for (let i = 0; i < dayCount; i++) {
  //   let dateDay = await page.locator('[class="day"]').nth(i).textContent();
  //   if (dateDay == day) {
  //     await page.locator('[class="day"]').nth(i).click();
  //     break;
  //   }
  // }
  await page.waitForTimeout(4000);
});
