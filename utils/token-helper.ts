export class getAccessToken {
  // loginPayLoad: any;
  apiContext: any;
  constructor(apiContext: any) {
    //  this.loginPayLoad = loginPayLoad
    this.apiContext = apiContext;
  }
  async getToken(loginPayLoad: any) {
    let res: { token?: any } = {};
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: loginPayLoad,
      }
    );
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    //    console.log(token);
    res.token = token;
    //    console.log(res)
    return token;
  }
}
