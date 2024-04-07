import { test, expect, defineConfig } from '@playwright/test';
import { PomManager } from '../pageObject/pom-manager';
test('@Hrm has title', async ({ page }) => {
   const pomData = new PomManager(page)
await page.route('**/*.{jpg,png,jpeg}',route=>route.abort())
let url : any = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    const loginPage = pomData.getLoginPage()
    await loginPage.goTo(url)
    await loginPage.validLogin('Admin','admin123')
   test.setTimeout(20000)
  await loginPage.urlValidation("orangehrmlive")

  })