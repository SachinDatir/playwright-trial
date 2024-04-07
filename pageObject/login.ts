import { expect } from "@playwright/test";

export class LoginPage {
    page: any;
    signInbutton: any;
    userName: any;
    password: any;

    constructor(page:any)
    {
        this.page = page;
        this.signInbutton= page.locator('button[type="submit"]');
        this.userName = page.locator("input[name='username']")
        this.password =  page.locator("input[type='password']")
       
    
    }
    
    async goTo(url:any)
    {
        await this.page.goto(url);
    }
    
    async validLogin(username:any,password:any)
    {
        await  this.userName.fill(username);
        await this.password.fill(password);
        await this.signInbutton.click();   
    }

    async urlValidation(data:any){
        expect(this.page.url()).toContain(data)
    }

    async clickButton(locator:any){
        await this.page.locator(locator).click()
    }
    async waitForElement(element:any){
      await this.page.locator(element).waitFor()

    }

    async addInitScript(token:any){
        this.page.addInitScript((value: string) => {
            window.localStorage.setItem('token',value);
        },token );
    }
    
    }
