import { test, expect } from "@playwright/test";
test("handle alerts in playwright", async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  page.on('dialog', async simpleAlert => {
    await expect(simpleAlert.message()).toContain('I am a JS Alert');
    await expect(simpleAlert.type()).toContain('alert');
    await simpleAlert.accept();
  });
  await page.locator('button[onclick="jsAlert()"]').click()
  await expect(page.locator('#result')).toHaveText('You successfully clicked an alert')
  await page.waitForTimeout(5000)
});

test('js confirm alert', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  page.on('dialog', async simpleAlert => {
    await expect(simpleAlert.message()).toContain('I am a JS Confirm');
    await expect(simpleAlert.type()).toContain('confirm');
    await simpleAlert.accept();
  });
  await page.locator('button[onclick="jsConfirm()"]').click()
  await expect(page.locator('#result')).toHaveText('You clicked: Ok')
  await page.waitForTimeout(5000)

})
test('js prompt', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  page.on('dialog', async promptAlert => {
    console.log(promptAlert.message())
    await expect(promptAlert.message()).toContain('I am a JS prompt')
    await expect(promptAlert.type()).toContain('prompt')
    await promptAlert.accept('Sachin')
  })
  await page.locator('button[onclick="jsPrompt()"]').click()
  await expect(page.locator('#result')).toHaveText('You entered: Sachin')

})


test.only('Validate the stulz login flow', async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()
  const loginButton = page.locator('.login-btn')
  await page.goto('http://localhost:4200/auth/login', { waitUntil: "networkidle" })
  await page.evaluate(() => {
    const element = document.querySelector('.login-btn');
    if (element) {
      element.removeAttribute('disabled');
    }
  });

  await page.locator('[name="email"]').fill('datirsachin61@gmail.com')
  expect(loginButton).not.toHaveAttribute('disabled')
  await loginButton.click({ force: true })
  await page.evaluate(() => {
    const element = document.querySelector('.login-btn');
    if (element) {
      element.removeAttribute('disabled');
    }
  });
  await page.locator('[name="password"]').fill('Sachin@123')
  await loginButton.click({ force: true })
  await page.locator('ul[role="tablist"]').isVisible()
  await page.waitForTimeout(2000)
  // const links = page.locator('ul[role="tablist"] a');
  // const count = await links.count();
  // const hrefs: string[] = [];
  // for (let i = 0; i < count; i++) {
  //   const href = await links.nth(i).getAttribute('href');
  //   console.log(`Link ${i}:`, href, ':::::::::::::::');
  //   if (href && href.startsWith('/')) {
  //     hrefs.push(href);
  //   }
  // }
  // console.log('✅ Extracted hrefs:', hrefs);
  // for (let i = 0; i < hrefs.length; i++) {
  //   await page.locator(`a[href="${hrefs[i]}"]`).click({ force: true });
  //   await page.waitForTimeout(1000);
  //   await expect(page).toHaveURL(new RegExp(hrefs[i]));
  // }

  // await page.waitForTimeout(2000)
  await page.locator('#toolsTabBtn').click()
  await page.locator('[class="stats-card-box mb-0"]').click()
  const request = await page.waitForRequest(request =>
    request.url() === 'http://localhost:3000/v1/deu/cyberAirDx/1/performAllCalculations' &&
    request.method() === 'POST'
  );
  const response = await request.response();
  const responseBody = await response?.json();
  // console.log('✅ Request:', request.url());
  // console.log('✅ Response Body:', responseBody.body.data);
const res = responseBody.data

  if (responseBody?.body?.data) {
    console.log('✅ Dataaaaaaaaaaaaaa:', responseBody.body.data);
  } else if (responseBody?.data) {
    console.log('✅ Data:', responseBody.data);
  } else {
    console.error('❌ Data field not found in response');
  }

console.log(res.outputData.unitOutput.unitType,'::::::::::::::')
expect(res.outputData.unitOutput.unitType).toEqual('ASD 171 A')
  await page.pause()
})