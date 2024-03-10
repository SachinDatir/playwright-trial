import { test, expect, Locator } from '@playwright/test';
test.describe(()=>{
  // test()
})
test('Validate broken link',async({page})=>{
await page.goto('https://www.kesari.in/')
await page.locator('[role="button"]').first().click({force:true})
let arr:any =[]
const dropdownListItems = await page.$$('.megamenu__dropdown-list > li');
for (let i = 0; i < dropdownListItems.length; i++) {
  const link = await dropdownListItems[i].$('a');
  if (link) {
    const href = await link.getAttribute('href');
    if (href) {
      arr.push(href);
    }
  }
}
// for (let i = 0; i < dropdownListItems.length; i++) {
//     const link = await dropdownListItems[i].$('a');
//     if (link) {
//       const href = await link.getAttribute('href');
//       if (href && href.startsWith('/')) {
//         const text = await link.innerText();
//         console.log(text);
//         await link.click({ force: true });
//         await page.waitForTimeout(3000)
//         await page.waitForURL(arr[i]);
//       }
//     }
//   }
for (let i = 0; i < dropdownListItems.length; i++) {
    const link :any= await dropdownListItems[i].$('a');
    if (link) {
      const href = await link.getAttribute('href');
      if (href && href.startsWith('/')) {
        const text = await link.innerText();
        console.log(text);
        await page.waitForTimeout(3000)
        await page.waitForSelector(link,{state:'visible'})
        await link.click({ force: true });
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        if (page.isClosed()) {
          throw new Error('Page was closed unexpectedly.');
        }
        expect(await page.url()).toContain(arr[i]);
      }
    }
  }
})