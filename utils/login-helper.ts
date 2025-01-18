// import { expect } from "@playwright/test"

// export class ApiUtils{
//     apiContext: any
//     loginPayLoad: any;
//     // page: any
//     constructor(apiContext:any,loginPayLoad:any){
//         this.apiContext = apiContext,
//         this.loginPayLoad = loginPayLoad;

//     }
//     async getAccessToken(){
//         const apiRes  = await this.apiContext.post("https://www.rahulshettyacademy.com/api/ecom/auth/login",{
//         data:this.loginPayLoad
// })  
// expect(apiRes.ok()).toBeTruthy()
// expect(apiRes.ok()).not.toBeFalsy()
// const resJson =  await apiRes.json()
// const token =resJson.token
// console.log(token)
// return token
//     }

//     async createOrder(orderPayLoad:any){
//         let response: { token?: any,orderId?:any } = {};
//         response.token = this.getAccessToken()
// const res = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{
//     data:orderPayLoad,
//     Headers:{
//         'Authorization' :response.token,
//         'Content-Type'  : 'application/json'
//     }
// })
// const resJson = await res.json()
// // const id = resJson.order[0]
// // console.log(resJson.body);

// const orderId = resJson.orders[0];
//    response.orderId = orderId;
//    return response
//     }
// }

import { Page, Locator } from '@playwright/test';
export class APiUtils {
    apiContext: any;
    loginPayLoad: any;

    constructor(apiContext: any, loginPayLoad: any) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;

    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad
            })//200,201,
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;

    }

    async createOrder(orderPayLoad: any) {
        let response: { token?: any, orderId?: any } = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                },

            })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;

        return response;
    }



}
// module.exports = {APiUtils};



export class RegisterPage {
    private page: Page
    private firstName: Locator
    private lastName: Locator
    private email: Locator
    private password: Locator
    private passConfirmation: Locator
    private createButton: Locator
    private successMsg: Locator

    constructor(page: Page) {
        this.page = page
        this.firstName = page.locator('#firstname')
        this.lastName = page.locator('#lastname')
        this.email = page.locator('#email_address')
        this.password = page.locator('#password')
        this.passConfirmation = page.locator('#password-confirmation');
        this.createButton = page.locator('[title="Create an Account"]');
        this.successMsg = page.locator('.message-success > div');

    }
    async clickButton(locator: any) {
        await this.page.locator(locator).click({ force: true })
    }

    async goToPage(web: string): Promise<void> {
        await this.page.goto(web,{waitUntil:'load'})
    }

    async fillRegisterForm(firstName: string, lastName: string, email: string, password: string): Promise<void> {
        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.email.fill(email)
        await this.password.fill(password)
        await this.passConfirmation.fill(password)
    }

    async submitRegForm(): Promise<void> {
        await this.createButton.click({ force: true })
    }

    async getSuccessMsg(msg:any): Promise<void> {
        this.successMsg.textContent(msg) ?? ''
    }
    
} 
