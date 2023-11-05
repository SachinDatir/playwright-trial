import { test, expect } from "@playwright/test";
test("handle alerts in playwright", async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  page.on('dialog', async simpleAlert   =>{
    await expect(simpleAlert.message()).toContain('I am a JS Alert');
    await expect(simpleAlert.type()).toContain('alert');
    await simpleAlert.accept();
  });
  await page.locator('button[onclick="jsAlert()"]').click()
  await expect(page.locator('#result')).toHaveText('You successfully clicked an alert')
  await page.waitForTimeout(5000)
});

test('js confirm alert',async({page})=>{
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
 page.on('dialog', async simpleAlert   =>{
    await expect(simpleAlert.message()).toContain('I am a JS Confirm');
    await expect(simpleAlert.type()).toContain('confirm');
    await simpleAlert.accept();
  });
  await page.locator('button[onclick="jsConfirm()"]').click()
  await expect(page.locator('#result')).toHaveText('You clicked: Ok')
  await page.waitForTimeout(5000)

})
test('js prompt',async({page})=>{
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
 page.on('dialog',async promptAlert=>{
  console.log(promptAlert.message())
  await expect(promptAlert.message()).toContain('I am a JS prompt')
  await expect(promptAlert.type()).toContain('prompt')
  await promptAlert.accept('Sachin')
 })
 await page.locator('button[onclick="jsPrompt()"]').click()
 await expect(page.locator('#result')).toHaveText('You entered: Sachin')

})