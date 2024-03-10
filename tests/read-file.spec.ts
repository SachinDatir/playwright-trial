
import {test,expect} from '@playwright/test'
import fs from 'fs'
import csv from 'csv-parser'

test('Read CSV file in Playwright', async ({}) => {
    const results = [];
    const csvFilePath = "tests/uploadFile/customers-100.csv";
    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data:any) => results.push(data))
        .on('end', () => {
            console.log('CSV file contents:', results[0]['Index']);
            console.log('CSV file contents:', results[0]['Company']);
        });
});

test.only('Read CSV file',async({page})=>{
    const result = []
const filePath = "tests/uploadFile/customers-1000.csv"
fs.createReadStream(filePath).pipe(csv()).on('data',(data:any)=>result.push(data))
.on('end',()=>{
//    for(let i =0;i<result.length;i++){
   result.forEach((el:any,i)=>{
    if(el.Country=='Albania'){
        console.log(el)
    }
   })
//    }
})
})