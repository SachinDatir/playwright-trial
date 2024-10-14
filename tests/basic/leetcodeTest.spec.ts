import {test,expect} from '@playwright/test'
test('Validate the leetcode form feeling functionality',async({page})=>{
   await page.goto('https://letcode.in/test')
   await page.locator('[href="/buttons"]').click()
   const buttonSelector = '[href="/buttons"]'
   const buttonElement = await page.locator(buttonSelector);
   if (buttonElement) {
     const boundingBox = await buttonElement.boundingBox();
     
     if (boundingBox) {
       const { x, y, width, height } = boundingBox;
       console.log(`Button coordinates: x=${x}, y=${y}`);
       console.log(`Button dimensions: width=${width}, height=${height}`);
     } else {
       console.log('Bounding box not available.');
     }
   } else {
     console.log('Button not found.');
   }
   
})