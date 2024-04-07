import {test,expect,request} from '@playwright/test'
import {getAccessToken} from '../utils/token-helper'
const loginPayload =  {userEmail: "sdatir83@gmail.com", userPassword: "Password1!"}
let resToken:any
test.beforeAll(async()=>{
    const apiContext = await request.newContext()
    const getToken = new getAccessToken(apiContext)
     resToken =await getToken.getToken(loginPayload)
    //  console.log(resToken)
})
test('Validate the intercept call',async({page})=>{
page.addInitScript(value=>{
    window.localStorage.setItem('token',value)
},resToken)
await page.goto("https://rahulshettyacademy.com/client");
await page.locator(".card-body b").first().waitFor();
await page.locator("button[routerlink*='myorders']").click();
await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',route=>route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'}))
await page.locator('button:has-text("View")').first().click()
await expect(page.locator("p").last()).toHaveText('You are not authorize to view this order')
})