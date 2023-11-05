import {test, expect} from '@playwright/test'
test('validate the keyboard functionality',async({page})=>{
    await page.goto('https://gotranscript.com/text-compare')
    await page.keyboard.down('PageDown')
    await page.keyboard.down('PageUp')
    await page.locator('textarea[name="text1"]').fill('I am learning Playwright')
    await page.keyboard.press('Control+A')
    await page.keyboard.press('Control+C')
    await page.keyboard.down('Tab')
    await page.keyboard.press('Control+V')
    expect(await page.locator('[name="text2"]')).toHaveText('I am learning Playwright')
    await page.waitForTimeout(4000)
})