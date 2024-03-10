import {test,expect} from '@playwright/test'
test('route',async({ page })=>{
    await page.route('**/api/settings', async route => {
        // Fetch original settings.
        const response = await route.fetch();
      
        // Force settings theme to a predefined value.
        const json = await response.json();
        json.theme = 'Solorized';
      
        // Fulfill with modified data.
        await route.fulfill({ json });
      });
})