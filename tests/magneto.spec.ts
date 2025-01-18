import {test, expect} from '@playwright/test'
import {faker} from '@faker-js/faker'
import { RegisterPage } from '../utils/login-helper'
test('user should be able to register an user',async({page})=>{
    let regPage = new RegisterPage(page)
    const password = 'Pass@123'
    let url = "https://magento.softwaretestingboard.com/customer/account/create/"
    let username :string= faker.internet.userName()
    let lastName :string= faker.internet.userName()
    let email :string= faker.internet.email()
    let successMsg:string ='Thank you for registering with Main Website Store.'
//  await page.goto('https://magento.softwaretestingboard.com/customer/account/create/',{waitUntil:'load'})
//  await page.locator('#firstname').fill(faker.internet.userName())
//  await page.locator('#lastname').fill(faker.internet.userName())
//  await page.locator('#email_address').fill(faker.internet.email())
//  await page.locator('#password').fill(password)
//  await page.locator('#password-confirmation').fill(password)
//  await page.waitForTimeout(2000)
//  await regPage.clickButton('[title="Create an Account"]')
 await regPage.goToPage(url)
 await regPage.fillRegisterForm(username,lastName,email,password)
 await page.waitForTimeout(2000)
 await regPage.submitRegForm()
 await regPage.getSuccessMsg(successMsg)
})