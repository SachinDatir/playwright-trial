import { expect, test } from "@playwright/test";
// test.beforeEach(async({page})=>{
// await page.goto('https://codenboxautomationlab.com/practice/')

// })
test("codenBox functionality", async ({ page }) => {
  await page.goto("https://codenboxautomationlab.com/practice/");
  let radioButton = ".radioButton";
  await page.locator(radioButton).first().check();
  await page.locator(radioButton).first().isChecked();
  await page.waitForTimeout(3000);

  await page.locator(radioButton).nth(1).check();
  await page.locator(radioButton).nth(1).isChecked();
  await expect(page.locator(radioButton).first()).not.toBeChecked();

  page.pause();
});

test("dynamic dropdown", async ({ page }) => {
  await page.goto("https://codenboxautomationlab.com/practice/");
  await page.locator("#autocomplete").fill("In");
  await page
    .locator('ul>li[class="ui-menu-item"]>div')
    .filter({ hasText: "British Indian Ocean Territory" })
    .click();
  await page.locator("#dropdown-class-example").selectOption("Appium");
  await page.pause();
});

test("Checkbox", async ({ page }) => {
  await page.goto("https://codenboxautomationlab.com/practice/");
  let firstCheckbox: string = "#checkBoxOption1";
  let secCheckbox: string = "#checkBoxOption2";
  // await page.focus(firstCheckbox)
  await page.locator(firstCheckbox).scrollIntoViewIfNeeded();
  await page.check(firstCheckbox);
  await page.locator(firstCheckbox).isChecked();
  await expect(page.locator(firstCheckbox)).toBeChecked();
  await page.locator(secCheckbox).isChecked();
  await page.pause();
});

test.only("Multiple window", async ({ page }) => {
  await page.goto("https://codenboxautomationlab.com/practice/");
  await page.click("#opentab");
  await page.waitForTimeout(10000);
  // await expect(page.url()).toContain('codenBox')
  await expect(page.locator('#ct_logo-60a1a01')).toBeVisible()

//   const [tabs] = await Promise.all([
//     page.context().waitForEvent('page'),
//     page.click(`x`)
// ])
// await tabs.waitForLoadState('networkidle');
// expect(await tabs.title()).toEqual('some title');
// // get the number of open tabs
// const openTabs = await tabs.context().pages()
// await openTabs[1].bringToFront()
});
