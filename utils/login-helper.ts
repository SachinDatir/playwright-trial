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


export class APiUtils
{
    apiContext: any;
    loginPayLoad: any;

    constructor(apiContext,loginPayLoad)
    {
        this.apiContext =apiContext; 
        this.loginPayLoad = loginPayLoad;
        
    }

    async getToken()
     {
        const loginResponse =  await  this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.loginPayLoad
         } )//200,201,
        const loginResponseJson = await loginResponse.json();
        const token =loginResponseJson.token;
        console.log(token);
        return token;

    }

    async createOrder(orderPayLoad:any)
    {
        let response:{token?:any,orderId?:any} = {};
       response.token = await this.getToken();
    const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
   {
    data : orderPayLoad,
    headers:{
                'Authorization' :response.token,
                'Content-Type'  : 'application/json'
            },

   })
   const orderResponseJson =await orderResponse.json();
   console.log(orderResponseJson);
  const orderId = orderResponseJson.orders[0];
   response.orderId = orderId;

   return response;
}

    }
// module.exports = {APiUtils};




