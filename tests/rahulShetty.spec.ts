import {test,expect ,request} from '@playwright/test'
import {APiUtils} from '../utils/login-helper'
const orderPayLoad = {orders:[{country:"India",productOrderedId:"65ef3ccaa86f8f74dc98fc1c "}]};
const loginPayload =  {userEmail: "sdatir83@gmail.com", userPassword: "Password1!"}
import { LoginPage } from '../pageObject/login';
import * as RahulShettyFixture from '../fixture/rahulshetty.json'
import { dashboardPage } from '../pageObject/dashboardpage';
import {SecurePage} from '../pageObject/secure.page'
import { getAccessToken } from '../utils/token-helper';

var token: any 
let response:any
test.beforeAll(async()=>{
    const apiContext = await request.newContext()
    const apiUtils = new APiUtils(apiContext,loginPayload)
    const getToken = new getAccessToken(apiContext)
   response =  getToken.getToken(loginPayload)
//    resToken = await apiUtils.getAccessToken()
})

test.skip('Skip login through api call',async({page})=>{
   
   page.addInitScript(value=>{
     window.localStorage.setItem('token', value)
   },token)
    const product = page.locator('.card-body')
    await page.goto('https://www.rahulshettyacademy.com/client')
    const count=await product.count()
    for(let i =0 ;i<count;++i){
        if(await product.nth(i).locator('b').textContent() === "ZARA COAT 3") {
            await product.nth(i).locator("text= Add To Cart").click({force:true})
            break
        }
    }
    await page.pause()

   

})

test('place order through the api',async({page})=>{
    let url = "https://rahulshettyacademy.com/client"
    const loginData = new LoginPage(page)
    const securePageData = new SecurePage(page)
await loginData.addInitScript(response.token)
await loginData.goTo(url)
// await securePageData.openPath()
// page.setDefaultTimeout(2000)
await loginData.clickButton(RahulShettyFixture.selector.orderButton)
await loginData.waitForElement(RahulShettyFixture.selector.tBody)
const dashboardPageData = new dashboardPage(page)
const row= await page.locator('tbody tr')
for(let i =0;i< await row.count();i++){
    const rowId = await row.nth(i).locator('th').textContent()
    if(response.orderId.includes(rowId))
    await row.nth(i).locator('button').first().click()
break
}
const orderDetails = await page.locator('.col-text').textContent()
    expect(response.orderId.includes(orderDetails)).toBeTruthy()

})

