const { defineParameterType, When, Given,Then,Before } = require("@cucumber/cucumber")
const {test, expect} = require('@playwright/test');
  Given('User has browsed the login hrm page', {timeout:20000},async function () {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  });

When('User supply invalid <{string}> and {string}', async function (username, password){
    await this.page.locator("input[name='username']").fill(username)
    await this.page.locator("input[type='password']").fill(password)
    await this.page.locator('button[type="submit"]').click()
});

Then('User will find an error message', async function () {
    let errorMessage = await this.page.locator('div>p.oxd-text').first().textContent();
    expect( errorMessage).toContain('Invalid credentials')
   
});