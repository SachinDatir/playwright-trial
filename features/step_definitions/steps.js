const { When, Given,Then,Before } = require("@cucumber/cucumber")


const {test, expect} = require('@playwright/test');
  Given('User has browsed the login page', {timeout:20000},async function () {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  });

When('User suply username and password', async function () {
    await this.page.locator("input[name='username']").fill('Admin')
    await this.page.locator("input[type='password']").fill('admin123')
    await this.page.locator('button[type="submit"]').click()
});

Then('User will find the dashboard page', async function () {
    expect( await this.page.url()).toContain('orangehrmlive')
   
});