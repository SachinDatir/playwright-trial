import { test, expect } from "@playwright/test";
// test.afterEach(async({page})=>{
//     await page.pause()
// })
test("double click action in playwright", async ({ page }) => {
  await page.goto("https://demoqa.com/buttons");
  await page.dblclick("#doubleClickBtn");
  await expect(page.locator("#doubleClickMessage")).toBeVisible();
  await page.locator("#doubleClickMessage");
  await expect(page.locator("#doubleClickMessage")).toHaveText(
    "You have done a double click"
  );
});

test("right functionality in playwright", async ({ page }) => {
  await page.goto("https://demoqa.com/buttons");
  // page.locator('#rightClickBtn').click({button:'right'})
  await page.click("#rightClickBtn", { button: "right" });
  await expect(page.locator('#rightClickMessage')).toHaveText('You have done a right click')
});

test('dynamic click',async({page})=>{
   await page.goto('https://demoqa.com/buttons')
   await page.locator('.mt-4>button').last().click()
   await expect(page.locator('#dynamicClickMessage')).toHaveText('You have done a dynamic click')
})

test('mousehover functionality',async({page})=>{
   await page.goto('https://demoqa.com/menu')
   await page.getByText('Main Item 2').hover()
   await page.getByText('SUB SUB LIST »').hover()
   await page.getByText('Sub Sub Item 2').click()
   await expect(page).toHaveURL('https://demoqa.com/menu#')
   await page.pause()

})