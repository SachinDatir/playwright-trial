import {test ,expect,request} from '@playwright/test'
import {getAccessToken} from '../utils/token-helper'
const loginPayload =  {userEmail: "sdatir83@gmail.com", userPassword: "Password1!"}
const fakePayLoadOrders = { data: [], message: "No Orders yet created, please create an order" };
let resToken:any
test.beforeAll(async()=>{
    const apiContext = await request.newContext()
    const getToken = new getAccessToken(apiContext)
     resToken =await getToken.getToken(loginPayload)
    //  console.log(resToken)
})
test('',async({page})=>{
    // console.log(resToken)
    page.addInitScript(value=>{
        window.localStorage.setItem('token',value)
    },resToken)
    await page.goto('https://www.rahulshettyacademy.com/client')
    await page.route('https://www.rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/653e2a7c7244490f95d9d1dd',async route=>{
        const response = await page.request.fetch(route.request())
        let body = JSON.stringify(fakePayLoadOrders)
        route.fulfill({
            response,
            body
        })
    })
  await page.locator("button[routerlink*='myorders']").click();
 await page.waitForResponse('https://www.rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/653e2a7c7244490f95d9d1dd')
 await expect(page.locator('.mt-4')).toHaveText(' You have No Orders to show at this time. Please Visit Back Us ')
//  await page.pause()
})
