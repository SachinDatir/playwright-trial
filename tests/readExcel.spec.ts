import {test, expect} from '@playwright/test'
import XLSX from 'xlsx'
test('Read the excel file',async({page})=>{
    const filePath = "tests/uploadFile/Call-Center-Sentiment-Sample-Data.xlsx"
    const workBook:XLSX.WorkBook = XLSX.readFile(filePath)
    const sheetName:string = workBook.SheetNames[0]
    const workSheet:XLSX.WorkSheet = workBook.Sheets[sheetName]
    const data:any[] = XLSX.utils.sheet_to_json(workSheet)
    // data.forEach((el:any) => {
       for(const element of data){
        console.log(element)
       }
    // });
})