import {test,expect} from '@playwright/test'
test('Handle child tab in playwright',async({browser})=>{
   const context = await browser.newContext()
   const page = await context.newPage()
   await page.goto('https://codenboxautomationlab.com/practice/')
   const docNewLink = await page.locator('#openwindow')
//    const newpage = await context.newPage()
 const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    docNewLink.click()
 ])
//  await newPage.waitForTimeout(2000)
 await newPage.locator('#ct_logo-60a1a01').waitFor()
 await newPage.locator('#ct_logo-60a1a01') .isVisible()
//  await newPage.pause()
})