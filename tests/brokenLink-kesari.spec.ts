import { test, expect } from "@playwright/test";
import { link } from "fs";

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
          // Reopen the popup for each link
          await popupLocator.click({ force: true });
      
          // Click the nth item in the dropdown list
          const nthLink = dropdownListItems.nth(i).locator("a");
          await nthLink.click();
      
          console.log(`Clicked on link: ${arr[i]}`);
      
          // Add optional validation or navigation checks after clicking
          await page.waitForLoadState("domcontentloaded");
        }
      });
      
        
// ]);
