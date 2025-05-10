import config from '../framework/config/configProjectHW';
import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
import { hwLoginPage, hwAccountPage } from '../framework/pages';

let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser: testBrowser }) => {
  browser = testBrowser
  context = await browser.newContext()
  page = await context.newPage()
  // интересно, можно ли взять эту проверку из hwAuth.spec.ts, чтобы не расисывать тут заново)
  const loginPage = hwLoginPage({ page })
  await loginPage.visit()
  await loginPage.open()
  await loginPage.fillEmail(config.email)
  await loginPage.fillPassword(config.password)
  await loginPage.clickBtnLogin()

  await expect(page).toHaveURL(config.baseURL)//(`${config.baseURL}/login`)
  await expect(page.locator("div.header-links a.account")).toHaveText(config.email)
})

test.afterAll(async () => {
  await context.close()
})

test('open account', async () => {
  const loginPage = hwLoginPage({ page })
  await loginPage.accountBtn()

  //await expect(page).toHaveTitle(/My account - Customer info/)
  await expect(page).toHaveTitle(/Demo Web Shop. Account/)
  await expect(page.locator("div.page-title h1")).toHaveText('My account - Customer info')
  await expect(page.locator("div.header-links a.account")).toHaveText(config.email)
})
test('account info', async () => {
    const loginPage = hwLoginPage({ page })
    await loginPage.accountBtn()
  
    await expect(page.locator("div.header-links a.account")).toHaveText(config.email)
    await expect(page.locator("input#FirstName")).toHaveValue(config.firstName)
    await expect(page.locator("input#LastName")).toHaveValue(config.lastName)
    await expect(page.locator("input#Email")).toHaveValue(config.email)
  })
  test('change gender', async () => {
    const loginPage = hwLoginPage({ page })
    await loginPage.accountBtn()
  
    if (await page.locator('input#gender-male').isChecked()) {
        await page.locator('input#gender-female').click();
        await expect(page.locator('input#gender-female')).toBeChecked();
    } 
    else {
        await page.locator('input#gender-male').click();
        await expect(page.locator('input#gender-male')).toBeChecked();
    }
    const accontPage = hwAccountPage({ page })
    await accontPage.saveBtn()
  })
  test('change main info', async () => {
    const loginPage = hwLoginPage({ page })
    await loginPage.accountBtn()
    const accontPage = hwAccountPage({ page })
    await accontPage.fillFirstName(`${config.firstName}change`)
    await accontPage.fillLastName(`${config.lastName}change`)
    await accontPage.fillEmail(`${config.email}change`)
    await accontPage.saveBtn()
    //вернуть все назад)
    await loginPage.accountBtn()
    await accontPage.fillFirstName(`${config.firstName}`)
    await accontPage.fillLastName(`${config.lastName}`)
    await accontPage.fillEmail(`${config.email}`)
    await accontPage.saveBtn()
  })
  //npx playwright test hwAccount.spec.ts --headed  