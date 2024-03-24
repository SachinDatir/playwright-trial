import {test,expect, request} from '@playwright/test'

test.beforeAll(async()=>{
    const payload ={
        email:"sdatir83@gmail.com",password:"Password1!"
    }
    const api = request.newContext()
    ;(await api).post(`https://www.rahulshettyacademy.com/api/ecom/auth/login`,{
        data:payload
    })
    console.log(api)
})
test('Validate the hidden element',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.locator('#displayed-text').isVisible()
    await page.locator('#hide-textbox').click()
    expect(await page.locator('#displayed-text')).toBeHidden()

    
})