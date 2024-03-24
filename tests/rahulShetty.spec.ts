import {test,expect ,request} from '@playwright/test'
import {APiUtils} from '../utils/login-helper'
const orderPayLoad = {orders:[{country:"India",productOrderedId:"65ef3ccaa86f8f74dc98fc1c "}]};
const loginPayload =  {userEmail: "sdatir83@gmail.com", userPassword: "Password1!"}

var token: any 
let response:any
test.beforeAll(async()=>{
    const apiContext = await request.newContext()
    const apiUtils = new APiUtils(apiContext,loginPayload)
   response =  await apiUtils.createOrder(orderPayLoad);
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
    // console.log(response)
    // page.addInitScript(value=>{
    //     window.localStorage.setItem('token',value)
    // },response.token)
    page.addInitScript(value => {

        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client");
await page.locator("button[routerlink*='myorders']").click();
await page.locator('tbody').waitFor()
const row = await page.locator('tbody tr')
for(let i =0;i< await row.count();i++){
    const rowId = await row.nth(i).locator('th').textContent()
    if(response.orderId.includes(rowId))
    await row.nth(i).locator('button').first().click()
break
}
const orderDetails = await page.locator('.col-text').textContent()
    expect(response.orderId.includes(orderDetails)).toBeTruthy()

})