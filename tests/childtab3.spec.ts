import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
test("Validate the multiple window", async ({ browser }) => {
  const email= faker.internet.email()
  const context = await browser.newContext();
  const page = await context.newPage();
  const firstName = faker.lorem.word()
  const lastName = faker.lorem.word()
  const message = faker.lorem.word()
  await page.goto("http://webdriveruniversity.com/");
  const button = page.locator("#contact-us");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    button.click(),
  ]);
  await newPage.locator("#contact_form").waitFor();
  await newPage.locator("#contact_form").isVisible();
  await newPage.locator('[name="first_name"]').fill(firstName);
  await newPage.locator('[name="last_name"]').fill(lastName);
  await newPage.locator('[name="email"]').fill(email);
  await newPage.locator('[name="message"]').fill(message);
  await newPage.locator('[value="SUBMIT"]').click();
  const replyMsg = await newPage.locator("#contact_reply").textContent();
  expect(replyMsg).toContain("Thank You for your Message!");
});
