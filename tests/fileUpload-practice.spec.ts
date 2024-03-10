import { test,expect } from '@playwright/test'
// describe('')
test('Simple file upload',async({page})=>{
await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php')
await page.locator('#filesToUpload').setInputFiles('tests/uploadFile/sentiment.pdf')
await expect(page.url()).toContain('file')
// await page.pause()
})

test.only('File upload Alert ',async({page})=>{
    const file = 'tests/uploadFile/SKFT-1259_meeting.ics'
    await page.goto("https://webdriveruniversity.com/File-Upload/index.html")
    await page.locator('#myFile').setInputFiles(file)
    await page.on('dialog',async (fileAlert)=>{
    await expect(fileAlert.message()).toContain('Your file has now been uploaded!')
    await expect(fileAlert.type()).toContain('alert')
    await fileAlert.accept()
    })
    await page.locator('#submit-button').click()
    await expect(page.url()).toContain('SKFT-1259_meeting.ics')
    
})