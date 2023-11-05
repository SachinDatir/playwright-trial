import {test} from '@playwright/test'
import moment from 'moment'
test('Datepicker functionality',async({page})=>{
   await page.goto('https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo')
    page.click('input[placeholder="Start date"]')
    let prev = page.locator('th[class="prev"]')
    let next = page.locator('th[class="next"]')
    let mmYY = page.locator('th[class="datepicker-switch"]')
    await page.pause()

    let dateToSelect:string='May 2023'
    let thisMonth=moment(dateToSelect,'MMMM YYYY').isBefore()
    console.log(thisMonth)
    while(await mmYY.textContent()!=dateToSelect){
        if(thisMonth){
            prev.click()
        }
    }
})
