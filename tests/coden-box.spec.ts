import {test,expect} from '@playwright/test'
test('Validate the codenbox functionality',async({page})=>{
await page.goto('https://codenboxautomationlab.com/practice/')
await page.locator('.radioButton').first().click()
await page.locator('.radioButton').first().isChecked()
await page.locator('.radioButton').nth(1).uncheck()
await page.locator('.radioButton').last().uncheck()
// await page.pause()
})
test.only('validate the dynamic dropdown',async({page})=>{
    await page.goto('https://codenboxautomationlab.com/practice/')
    await page.locator('#autocomplete').fill('Ind')
    let text = await page.locator('[class="ui-menu-item-wrapper"]').count()
    for(let i =0;i<text;i++){
        let country  = await page.locator('.ui-menu-item>div').nth(i).textContent()
        if(country ==="British Indian Ocean Territory"){
            await page.locator('.ui-menu-item').nth(i).click()
            break
        }
    }
    // await page.pause()

})
