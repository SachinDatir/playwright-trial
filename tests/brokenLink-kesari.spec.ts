import { test, expect } from "@playwright/test";
// test.describe("validate the broken links", async () => [
  test("kesari tours and travels", async ({ page }) => {
    await page.goto("https://www.kesari.in/", { waitUntil: "load" });
  
    // Define the popup locator
    const popupLocator = page.locator("#adventurestylesDropdown");
  
    // Open the popup initially
    await popupLocator.click({ force: true });
  
    // Get the dropdown list items
    const dropdownListItems = page.locator(
      '//*[@id="navbarMenu"]/ul/li[2]/div/div/div/div[2]/ul/li'
    );
  
    // Extract all href links
    const links = await dropdownListItems.locator("a").all();
    const arr = [];
    for (const link of links) {
      const href = await link.getAttribute("href");
      if (href) {
        arr.push(href);
      }
    }
  
    console.log(arr, "Extracted Links :::::::::::");
  
    // Iterate through the dropdown items and click
    for (let i = 0; i < arr.length; i++) {
      await popupLocator.click({ force: true });
      // Use .first() to click the first occurrence of the link
      console.log(`a[href='${arr[i]}']`)
      await page.pause()
      const tabLocator = await page.locator(`a[href='${arr[i]}']`).first();
      await tabLocator.click({ force: true });
  
      // Wait for navigation or page update (use appropriate wait based on your case)
      await page.waitForTimeout(2000); // Adjust timeout as needed
  
      // Optionally, check if the URL matches the expected href
      await page.waitForURL(`**${arr[i]}`);
      console.log(`**${arr[i]}`);
    }
  });
  


// ]);
