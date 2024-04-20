import {test} from '@playwright/test'

test('Validate the child tab functionality',async ({browser})=>{
    const newContext = await browser.newContext()
    const page = await newContext.newPage()
   await page.goto('https://www.webdriveruniversity.com/')
   const childLink = await page.locator('#contact-us')
   const [newPage] = await Promise.all([
    newContext.waitForEvent('page'),
    childLink.click()
   ])
   await newPage.locator('#contact_form').waitFor()
   await newPage.locator('#contact_form').isVisible()

})