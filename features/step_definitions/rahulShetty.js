const { When, Given,Then,Before } = require("@cucumber/cucumber")
const {test, expect} = require('@playwright/test');

Given('User has logged in and browsed the dashboard page',{timeout:20000},async function(){
 await this.page.goto('https://www.rahulshettyacademy.com/client')
 await this.page.locator('#userEmail').fill('sdatir83@gmail.com')
 await this.page.locator('#userPassword').fill('Password1!')
 await this.page.locator('#login').click()
})
When('User select the product and click on add to cart',{timeout:20000},async function(){
    console.log('block2')
    const product = await this.page.locator('.card-body')
    const count= await product.count()
    for (let i = 0; i < count; ++i) {
        if (await product.nth(i).locator("b").textContent() === "IPHONE 13 PRO") {
           //add to cart
           await product.nth(i).locator("text= Add To Cart").click();
    await this.page.locator('[routerlink="/dashboard/cart"]').click({force:true})

           break;
        }
     }
})
Then('User will find the product in the cart cart',{timeout:20000} ,async function(){
    console.log('block 3')
    let text = await this.page.locator('.cartSection').locator('h3').textContent()
    await expect(text).toContain("IPHONE 13 PRO")
    await this.page.pause()
    
})