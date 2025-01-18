import { test, expect, Locator } from '@playwright/test';
// test.describe(()=>{
//   // test()
// })
test('Validate broken link',async({page})=>{
await page.goto('http://localhost:4200')
await page.locator("[name=email]")
.fill("datirsachin61@gmail.com");
await page.locator("[name=password]").fill("Sachin@123");
await page.waitForTimeout(1000);
await page.locator(".login-btn").dblclick({ force: true });
await page.waitForTimeout(1000);
await page.locator(".menu-profile>.name").click({ force: true });
    await page.locator('[href="/app/users/administration"]').click()
await page.waitForTimeout(4000)
// await page.locator('[role="button"]').first().click({force:true})
let arr:any =[]
const dropdownListItems = await page.$$('.nav>li');
for (let i = 0; i < dropdownListItems.length; i++) {
  const link = await dropdownListItems[i].$('a');
  if (link) {
    const href = await link.getAttribute('href');
    if (href) {
      arr.push(href);
    }
  }
}
  console.log(arr)
  // await page.pause()
  for (let i = 0; i < arr.length; i++) {
    const tabLocator = await page.locator(`a[href='${arr[i]}']`);
    await tabLocator.click({ force: true });
  
    // Wait for navigation or page update (use appropriate wait based on your case)
    await page.waitForTimeout(2000); // Adjust timeout as needed
  
    // Optionally, check if the URL matches the expected href
    await page.waitForURL(`**${arr[i]}`); 
    console.log(`**${arr[i]}`)
  }

})