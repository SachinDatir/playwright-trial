import {test ,expect} from '@playwright/test'

test('Validate the Screenshot and visual matching',async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.locator("input[name='username']").fill('Admin')
    await page.locator("input[type='password']").fill('admin123')
    await page.locator('button[type="submit"]').click()
    await page.waitForTimeout(20000)
    await page.screenshot({path: 'screenshot.png'});
    await page.locator('[class="oxd-topbar-header-breadcrumb"]').screenshot({path:'header.png'})
    await expect(page.locator('[class="oxd-topbar-header-breadcrumb"]')).toBeVisible()
})

test.only('matching the screenshot with wireframe',async({page})=>{
    await page.goto('https://google.com')
    expect(await page.screenshot()).toMatchSnapshot('google.png')
})