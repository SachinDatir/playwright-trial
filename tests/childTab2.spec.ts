import { test, expect } from "@playwright/test";

test("Validate the child tab functionality", async ({ browser }) => {
  const newContext = await browser.newContext();
  const page = await newContext.newPage();
  await page.goto("https://www.webdriveruniversity.com/");

  // Wait for the link and ensure it's interactable
  const childLink = await page.locator("#contact-us");
  // await expect(childLink).toBeVisible();

  // Wait for the new page to open
  const [newPage] = await Promise.all([
    newContext.waitForEvent("page"),
    childLink.click(),
  ]);

  // Ensure the new page loads completely
  await newPage.waitForLoadState();
  console.log(await newPage.title());
});

test.only("open multiple tabs", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.checklyhq.com/docs/");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    await page.getByRole("link", { name: "Checkly on Youtube" }).click(),
  ]);

  await page.waitForTimeout(4000);
  await page.screenshot({ path: "screenshot-tab-old.png" });
  await newPage.screenshot({ path: "screenshot-tab-new.png" });

  await browser.close();
});
