import test, { expect } from "@playwright/test";
test("drag and drop with inbuilt command", async ({ page }) => {
  const draggable: any = await page.locator("#box3");
  const droppabe = await page.locator("#box103");
  await page.goto(
    "http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html"
  );
  await draggable.dragTo(droppabe);
  droppabe.filter({ has: draggable });
  // await page.pause();
});

test("drag and drop with mouseeover action", async ({ page }) => {
  const draggable: any = await page.locator("#box4");
  const droppable: any = await page.locator("#box104");
  await page.goto(
    "http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html"
  );
  await page.locator("#box4").hover();
  await page.mouse.down();
  await page.locator("#box104").hover();
  await page.mouse.up();
  await droppable.filter({has:draggable})
});

test('validation',async({page})=>{
  const draggable:any=await page.locator('#box4')
  const droppable:any= await page.locator('#box104')
  await page.goto(
    "http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html"
  );
  await draggable.dragTo(droppable)
  await droppable.filter({has:draggable})
  // await expect(droppable).toHaveAttribute('style','visibility:visible')
  await page.locator('#box105').filter({hasNot:droppable})
  // await page.pause()
})