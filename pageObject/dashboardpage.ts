export class dashboardPage{
          page: any;
   
       constructor(page:any){
          this.page = page
      }
     async getElement(locator:any){
         await this.page.locator(locator)
     }

}