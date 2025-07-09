
import { el } from '@faker-js/faker'
import { test, expect } from '@playwright/test'
// import { couldStartTrivia } from 'typescript';
test.beforeEach(async ({ page }) => {
    const loginButton = page.locator('.login-btn')
    await page.goto('http://localhost:4200/auth/login', { waitUntil: "domcontentloaded" })
    await page.waitForTimeout(2000)
    await page.evaluate(() => {
        const element = document.querySelector('.login-btn');
        if (element) {
            console.log('enter in the loop')
            element.removeAttribute('disabled');
        }
    });
    await page.waitForTimeout(1000)

    await page.locator('[name="email"]').fill('datirsachin61@gmail.com')
    await expect(loginButton).not.toHaveAttribute('disabled')
    await loginButton.dblclick({ force: true })
    await page.waitForTimeout(1000)
    await page.evaluate(() => {
        const element = document.querySelector('.login-btn');
        if (element) {
            element.removeAttribute('disabled');
        }
    });
    await page.locator('[name="password"]').fill('Sachin@123')
    await loginButton.dblclick({ force: true })
    await page.locator('ul[role="tablist"]').isVisible()
    await page.waitForTimeout(2000)
})

test('Validate the stulz login flow', async ({ page }) => {

    const links = page.locator('ul[role="tablist"] a');
    const count = await links.count();
    const hrefs: string[] = [];
    for (let i = 0; i < count; i++) {
        const href = await links.nth(i).getAttribute('href');
        console.log(`Link ${i}:`, href, ':::::::::::::::');
        if (href && href.startsWith('/')) {
            hrefs.push(href);
        }
    }
    console.log('✅ Extracted hrefs:', hrefs);
    for (let i = 0; i < hrefs.length; i++) {
        await page.locator(`a[href="${hrefs[i]}"]`).click({ force: true });
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(new RegExp(hrefs[i]));
    }


})

test('verify the SCS on oneSelect', async ({ page }) => {
    await page.waitForTimeout(2000)
    await page.locator('#toolsTabBtn').click()
    await page.locator('[class="stats-card-box mb-0"]').click()
    const request = await page.waitForRequest(request =>
        request.url() === 'http://localhost:3000/v1/deu/cyberAirDx/1/performAllCalculations' &&
        request.method() === 'POST'
    );
    const response = await request.response();
    const responseBody = await response?.json();
    // console.log('✅ Request:', request.url());
    // console.log('✅ Response Body:', responseBody.body.data);
    const res = responseBody.data

    // if (responseBody?.body?.data) {
    //     console.log('✅ Dataaaaaaaaaaaaaa:', responseBody.body.data);
    // } else if (responseBody?.data) {
    //     console.log('✅ Data:', responseBody.data);
    // } else {
    //     console.error('❌ Data field not found in response');
    // }

    console.log(res.outputData.unitOutput.unitType, '::::::::::::::')
    expect(res.outputData.unitOutput.unitType).toEqual('ASD 171 A')
})

test('Verify the room cooling', async ({ page }) => {
    const loginButton = page.locator('.login-btn')
    await page.goto('http://localhost:4200/auth/login', { waitUntil: "domcontentloaded" })
    await page.waitForTimeout(2000)
    await page.evaluate(() => {
        const element = document.querySelector('.login-btn');
        if (element) {
            console.log('enter in the loop')
            element.removeAttribute('disabled');
        }
    });
    await page.waitForTimeout(1000)

    await page.locator('[name="email"]').fill('datirsachin61@gmail.com')
    await expect(loginButton).not.toHaveAttribute('disabled')
    await loginButton.dblclick({ force: true })
    await page.waitForTimeout(1000)
    await page.evaluate(() => {
        const element = document.querySelector('.login-btn');
        if (element) {
            element.removeAttribute('disabled');
        }
    });
    await page.locator('[name="password"]').fill('Sachin@123')
    await loginButton.dblclick({ force: true })
    await page.locator('ul[role="tablist"]').isVisible()
    await page.waitForTimeout(2000)
    const roomCooling = page.getByText(' Room Cooling ')
    const coolingSys = page.locator('#systemCooling')
    const productLine = page.locator('#countryFlag').nth(0)
    await roomCooling.isVisible()
    await roomCooling.click()
    await productLine.locator('h5[class="card-title m-0"]').nth(0).click()
    await coolingSys.scrollIntoViewIfNeeded()
    await coolingSys.locator('[data-bs-original-title="A"]').click()
    await page.locator('#modelSelectionProceed').click()
    const request = await page.waitForRequest(request =>
        request.url() === 'http://localhost:3000/v1/deu/cyberAirDx/1/performAllCalculations' &&
        request.method() === 'POST'
    );
    const response = await request.response();
    const responseBody = await response?.json();
    const res = responseBody.data
    console.log(res.outputData.unitOutput.unitType, '::::::::::::::')
    expect(res.outputData.unitOutput.unitType).toEqual('ASD 171 A')
    await page.locator('[data-bs-target="#CompressorStaticBackdrop"]').click()
    await page.waitForTimeout(1000)
    const button = page.locator('button[type="submit"]').nth(1)
    await button.isVisible()
    const [compReq] = await Promise.all([
        page.waitForRequest(request =>
            request.url() === 'http://localhost:3000/v1/deu/expertMode/compressorExpertCalculation' &&
            request.method() === 'POST'
        ),
        button.click()
    ]);

    const compRes = await compReq.response();
    const resBody = await compRes?.json();
    const resExpert = resBody.data
    const compressorData: any = {
        ID: 0,
        name: 'ZR61KCE-TFD',
        refrig: 6,
        sup: 1,
        evap: 15,
        cond: 45,
        ismid: false,
        isSGR: false,
        sgr: 7,
        cool: 3,
        cap: 20.1797808254485,
        pel: 3.6998293227459,
        i: 7.42188021826279,
        mf: 120.749545170997,
        hr: 23.1093864486498,
        hc: 23.6946186714592,
        imf: 0,
        tsi: 0,
        psi: 0,
        eco: 0,
        disT: 66.8122355745786,
        error: 16,
        condensingCap: 23.8796101481944,
        pelMod: 3.6998293227459,
        condCapMod: 23.8796101481944
    };

    console.log(resExpert.name, '::::::::::::::')
    for (const [key, value] of Object.entries(resExpert)) {
        console.log(key, value);
        expect(compressorData[key]).toEqual(value);
    }


    await page.waitForTimeout(1000)

    await page.locator('.btn-close').nth(9).click()

    const airFlow = '.flex-grow-1>#inputAirFlow'
    await page.locator('.flex-grow-1>#inputAirFlow').evaluate((el: HTMLInputElement) => {
        el.value = '4500';
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const [newAirFlow] = await Promise.all([
        page.waitForRequest(request =>
            request.url().endsWith('/cyberAirDx/1/performAllCalculations') &&
            request.method() === 'POST'
        ),
    ]);
    const reAIrFLoe = await newAirFlow.response();
    const resOfPer = await reAIrFLoe?.json();

    expect(resOfPer).toBeTruthy()

    // await page.pause()
})

test.only('Verify the value of the OCS in OneSelect', async ({ page }) => {
    const config = {
        location: "Paris",
        latitude: "18.524538700511606",
        longitude: "73.87893676757812",
        minTemp: "10",
        maxTemp: "41",
        newDefaultRetAirTemp: "35",
        newCondTemp: "46",
        newAltitude: "100",
        newAmbientTemp: "33",
        newAirFlow: "2000",
    };

    const expectedCondensers = [
        'KSV013A11p', 'KSV017A11p',
        'KSV022A21p', 'KSV030A21p',
        'KSV038A21p', 'KSV045A21p',
        'KSV058A31p', 'KSV075A41p',
        'KSV090A41p', 'KSV114A41p',
        'KSV150A61p'
    ];

    // -----------------------------
    // ▶️ Application Setup
    // -----------------------------
    await page.locator('app-filter-section>div>[id="applications"] h5').nth(0).click();
    await page.locator('[src="assets/img/country/DEU/products/cyberAirMini.jpg"]').click();
    await page.locator('[data-bs-original-title="Downflow"]').click();
    await page.locator('#modelSelectionProceed').click();

    // -----------------------------
    // ✅ Initial Calculation Check
    // -----------------------------
    const initialRequest = await page.waitForRequest(request =>
        request.url().includes('/performAllCalculations') &&
        request.method() === 'POST'
    );

    const initialResponse = await initialRequest.response();
    const initialData = await initialResponse?.json();

    expect(initialData.data).toBeTruthy();

    // -----------------------------
    // 🌡️ Update Ambient Temperature
    // -----------------------------
    const ambientTempInput = page.locator('.flex-grow-1 > #inputAmbientTemp');

    const [condListRequest] = await Promise.all([
        page.waitForRequest(req =>
            req.url().includes('/condenserList') && req.method() === 'POST'
        ),
        ambientTempInput.evaluate((el, value) => {
            const input = el as HTMLInputElement;
            if (input.value !== value) {
                input.value = value;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }, config.newAmbientTemp),
    ]);

    const updatedAmbient = await ambientTempInput.evaluate(el => (el as HTMLInputElement).value);
    expect(updatedAmbient).toBe(String(config.newAmbientTemp));
    console.log('✅ Ambient Temp updated to:', updatedAmbient);

    // -----------------------------
    // 📦 Verify Condenser List
    // -----------------------------
    const condListResponse = await condListRequest.response();
    const { data: condenserData } = await condListResponse?.json() || {};

    expect(Array.isArray(condenserData)).toBe(true);
    expect(condenserData.length).toBeGreaterThan(0);

    const actualCondNames = condenserData.map((item: { name: string }) => item.name);
    expect(actualCondNames).toEqual(expectedCondensers);

    console.log('✅ First condenser name:', actualCondNames[0]);

    // -----------------------------
    // 💨 Update Air Flow Value
    // -----------------------------
    const airFlowInput = page.locator('.flex-grow-1 > #inputAirFlow');

    const [airFlowRequest] = await Promise.all([
        page.waitForRequest(req =>
            req.url().includes('/performAllCalculations') && req.method() === 'POST'
        ),
        airFlowInput.evaluate((el, value) => {
            const input = el as HTMLInputElement;
            if (input.value !== value) {
                input.value = value;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }, config.newAirFlow),
    ]);

    const airFlowResponse = await airFlowRequest.response();
    const airFlowData = await airFlowResponse?.json();
    expect(airFlowData).toBeTruthy();

    const updatedAirFlow = await airFlowInput.evaluate(el => (el as HTMLInputElement).value);
    expect(updatedAirFlow).toBe(String(config.newAirFlow));

    console.log('✅ Air Flow input updated to:', updatedAirFlow);


    //low noise 

    // const lowNoise = page.locator('#soundGroupRadios2')
    // const [lowNoiseCodList] = await Promise.all([
    //     page.waitForRequest(req =>
    //         req.url().includes('/condenserList') && req.method() === 'POST'
    //     ),

    //     lowNoise.check({ force: true })

    // ])
    await page.waitForTimeout(2000)
    const [lowNoiseCodList] = await Promise.all([
        page.waitForRequest(
            req =>
                req.url().includes('/condenserList') &&
                req.method() === 'POST',
            { timeout: 50000 }
        ),
        page.locator('#soundGroupRadios2').click({ force: true }),
    ]);


    const json = await lowNoiseCodList.response();
    const aa = json?.json()
    expect(aa).toBeTruthy();
    await page.locator('#soundGroupRadios2').isChecked()
    expect(json).toBeTruthy()
    // console.log(json)
    await page.waitForTimeout(2000)
    await page.locator('a[data-bs-original-title="Save"]').click()
    const model = page.locator('[class="modal-dialog"]>div')
    await model.first().isVisible()
    await page.waitForTimeout(2000)
    const modelTitle = await model.locator('[class="modal-title"]').first().evaluate((El) => (El as HTMLInputElement).textContent)
    expect(modelTitle).toContain('Save Configuration')
    await page.locator('app-custom-dropdown').nth(0).click({ force: true })
    await page.locator('#ProjectDropdown .list-project', { hasText: 'SCS Saving' }).nth(0).click({ force: true });
    // const options = await page.locator('#ProjectDropdown .list-project').nth(0).allTextContents();
    // console.log(options, '::::::::::::');

    // for (const option of options) {
    //     if (option.trim() === 'SCS Saving') {
    //         await page.getByText('SCS Saving', { exact: true }).nth(0).click();
    //         break;
    //     }
    // }


    await page.pause();
});

