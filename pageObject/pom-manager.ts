import { LoginPage } from "./login";

export class PomManager{
    loginData: LoginPage;
    page:any
    constructor(page: any){
          this.page = page
          this.loginData = new LoginPage(this.page)
    }

    getLoginPage(){
        return this.loginData;
    }
}