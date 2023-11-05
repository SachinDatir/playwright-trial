import { test, expect } from "@playwright/test";

test("fileupload funntionality", async ({ page }) => {
  page.goto("https://webdriveruniversity.com/File-Upload/index.html");
  page.locator("#myFile").setInputFiles("tests/uploadFile/fileToUpload.pdf");

  page.on("dialog", async (fileAlert) => {
    await expect(fileAlert.message()).toContain(
      "Your file has now been uploaded!"
    );
    await expect(fileAlert.type()).toContain("alert");
    await fileAlert.accept();
  });
  await page.locator('#submit-button').click()
  await expect(page.url()).toContain('fileToUpload')
});
test("multiple fileupload funntionality ", async ({ page }) => {
  let fileOne:any='tests/uploadFile/fileToUpload.pdf'
  let fileTwo:any='tests/uploadFile/sentiment.pdf'
 await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");
 await page.locator("#filesToUpload").setInputFiles([fileOne,fileTwo]);
 await expect(await page.locator('#fileList>li').first()).toContainText('file')
 await expect(await page.locator('#fileList>li').last()).toContainText('sentiment')
});