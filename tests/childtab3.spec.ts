import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
test("Validate the multiple window", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("http://webdriveruniversity.com/");
  const button = page.locator("#contact-us");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    button.click(),
  ]);
  await newPage.locator("#contact_form").waitFor();
  await newPage.locator("#contact_form").isVisible();
  await newPage.locator('[name="first_name"]').fill(faker.lorem.word());
  await newPage.locator('[name="last_name"]').fill(faker.lorem.word());
  await newPage.locator('[name="email"]').fill(faker.internet.email());
  await newPage.locator('[name="message"]').fill(faker.lorem.words(4));
  await newPage.locator('[value="SUBMIT"]').click();
  const replyMsg = await newPage.locator("#contact_reply").textContent();
  expect(replyMsg).toContain("Thank You for your Message!");
});
