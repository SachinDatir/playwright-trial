import { test, expect } from "@playwright/test";

test("Validate the demoqa website ne tab", async ({ browser }) => {
  let context = await browser.newContext();
  let page = await context.newPage();
  await page.goto("https://demoqa.com/buttons", { waitUntil: "load" });
  await page.locator(".separator").nth(2).click();
  await page.getByText("Browser Windows").click();
  const newTabButton = page.locator("#tabButton");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    newTabButton.click(),
  ]);
  await newPage.locator('#sampleHeading').isVisible()
  let pageTitle = newPage.locator('#sampleHeading')
  expect(pageTitle).toHaveText('This is a sample page')
//   await page.pause();
});

test("Validate the demoqa website new window", async ({ browser }) => {
    let context = await browser.newContext();
    let page = await context.newPage();
    await page.goto("https://demoqa.com/buttons", { waitUntil: "load" });
    await page.locator(".separator").nth(2).click();
    await page.getByText("Browser Windows").click();
    const newTabButton = page.locator("#windowButton");
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      newTabButton.click(),
    ]);
    await newPage.locator('#sampleHeading').isVisible()
    let pageTitle = newPage.locator('#sampleHeading')
    expect(pageTitle).toHaveText('This is a sample page')
  //   await page.pause();
  });

  test.only("Validate the demoqa website new window message", async ({ browser }) => {
    let context = await browser.newContext();
    let page = await context.newPage();
    await page.goto("https://demoqa.com/buttons", { waitUntil: "load" });
    await page.locator(".separator").nth(2).click();
    await page.getByText("Browser Windows").click();
    const newTabButton = page.locator("#messageWindowButton");
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      newTabButton.click(),
    ]);
    await newPage.locator('#body').isVisible()
    let pageTitle = newPage.locator('body')
    expect(pageTitle).toContainText('Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization')
  //   await page.pause();
  });
