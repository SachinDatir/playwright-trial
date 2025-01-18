import { test, expect } from "@playwright/test";
test.skip("Validate the demoqa child-tab one", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://demoqa.com/browser-windows", { waitUntil: "load" });
  const homeButton = page.locator("#tabButton");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    homeButton.click(),
  ]);
  await newPage.title();
  await newPage.pause();
});

test.skip("TC2 another way to perform slider", async ({ page }) => {
  await page.goto("https://demoqa.com/slider", { waitUntil: "load" });
  const slider = page.locator('span>[type="range"]');

  // Get the bounding box of the slider
  const boundingBox: any = await slider.boundingBox();

  // Calculate the starting position
  const startX = boundingBox.x + boundingBox.width / 2;
  const startY = boundingBox.y + boundingBox.height / 2;

  // Simulate a drag to move the slider
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX + 50, startY); // Adjust movement as needed
  await page.mouse.up();

  // Verify the slider's value
  const value = await slider.evaluate((el) => el);
  console.log(`Slider value: ${value}`);
  await page.pause();
});

test.skip("Set slider value directly", async ({ page }) => {
  // Navigate to the page with the slider
  await page.goto("https://demoqa.com/slider", { waitUntil: "load" });

  // Locate the slider
  const slider = page.locator('span>[type="range"]');

  // Set the value of the slider directly
  await slider.evaluate((el: any, value) => {
    el.value = value;
    el.dispatchEvent(new Event("input")); // Trigger input event
    el.dispatchEvent(new Event("change")); // Trigger change event
  }, 79); // Set the value to 75

  // Verify the slider's value
  const value = await slider.evaluate((el) => el.textContent);
  console.log(`Slider value: ${value}`);
  let val = await slider.inputValue();
  //  console.log(val,'>>>>>>>>>>>>>>>>>')
  expect(val).toEqual("79");

  await page.pause();
});

test("target attr", async ({ page }) => {
  await page.goto("https://demoqa.com/links", { waitUntil: "load" });
  const link = page.locator("#simpleLink"); // Locate a link with target attribute

  // Use evaluate to remove the target attribute
  await link.evaluate((el) => el.removeAttribute("target"));

  await link.click();
  await page.pause();
});

test("Validate the demoqa child-tab", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://demoqa.com/browser-windows", { waitUntil: "load" });

  const homeButton = page.locator("#tabButton");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"), // Wait for the child tab to open
    homeButton.click(), // Click the button to open the tab
  ]);

  // Ensure the new page is loaded
  await newPage.waitForLoadState("load");

  // Get and log the title of the new tab
  const title = await newPage.title();
  console.log("Child tab title:", title);

  // Pause for debugging
  await newPage.pause();
});

test("handle the child tab using the target attr", async ({ page }) => {
  await page.goto("https://demoqa.com/browser-windows", { waitUntil: "load" });
  const link = page.locator("#tabButton");
  // Use evaluate to remove the target attribute
  await link.evaluate((el) => el.removeAttribute("target"));
  // 956004600 cacel the airtel fiber

  await link.click();
  await page.pause();
});

test.only("Verify the inframe functionality", async ({ page }) => {
  await page.goto("https://demoqa.com/frames");
  let frame = page.frameLocator("#frame1Wrapper");
  let nestedFrame = frame.locator("#frame1")
  let aa = await nestedFrame.locator('#sampleHeading').textContent()
  expect(aa).toContain("This is a sample page");

  await page.pause();
});
