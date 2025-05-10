import config from '../framework/config/configProjectHW'
import { test, expect } from '@playwright/test'
import { hwRegisterPage, hwLoginPage } from '../framework/pages'

// Тесты регистрации 
test('register title', async ({ page }) => {
  const authPage = hwRegisterPage({ page })
  await authPage.visit()
  await authPage.open()
  
  await expect(page).toHaveTitle(/Register/)
})

test('auth fields validation', async ({ page }) => {
  const authPage = hwRegisterPage({ page })
  await authPage.visit()
  await authPage.open()
  await authPage.clickBtn()
  
  await expect(page.locator("span[for=FirstName]")).toHaveText("First name is required.")
  await expect(page.locator("span[for=FirstName]")).toBeVisible()
  await expect(page.locator("span[for=LastName]")).toHaveText("Last name is required.")
  await expect(page.locator("span[for=LastName]")).toBeVisible()
  await expect(page.locator("span[for=Email]")).toHaveText("Email is required.")
  await expect(page.locator("span[for=Email]")).toBeVisible()
  await expect(page.locator("span[for=Password]")).toHaveText("Password is required.")
  await expect(page.locator("span[for=Password]")).toBeVisible()
  await expect(page.locator("span[for=ConfirmPassword]")).toHaveText("Password is required.")
  await expect(page.locator("span[for=ConfirmPassword]")).toBeVisible()
})

test('user register success', async ({ page }) => {
  const authPage = hwRegisterPage({ page })

  await authPage.visit()
  await authPage.open()
  await authPage.chooseGender()
  await authPage.fillFirstName(`${config.firstName}`)
  await authPage.fillLastName(`${config.lastName}`)
  await authPage.fillEmail(`${config.email}`)
  await authPage.fillPassword(`${config.password}`)
  await authPage.fillConfirmPassword(`${config.password}`)

  await authPage.clickBtn()

  await expect(page.locator("div.result")).toHaveText(/  Your registration completed/) // тут важно указать не авторизованную почту
  await expect(page.locator("div.result")).toBeVisible()
  await expect(page).toHaveURL(`${config.baseURL}/registerresult/1`)

  await authPage.clickContinueBtn()
  await expect(page).toHaveURL(`${config.baseURL}`)
  await expect(page.locator("div.header-links a.ico-logout")).toHaveText('Log out')

  await authPage.clickLogoutBtn()
})

test('creating registrated user again', async ({ page }) => {
  const authPage = hwRegisterPage({ page })

  await authPage.visit()
  await authPage.open()
  await authPage.chooseGender()
  await authPage.fillFirstName(`${config.firstName}`)
  await authPage.fillLastName(`${config.lastName}`)
  await authPage.fillEmail(`${config.email}`)
  await authPage.fillPassword(`${config.password}`)
  await authPage.fillConfirmPassword(`${config.password}`)

  await authPage.clickBtn()

  await expect(page.locator("div.validation-summary-errors li")).toHaveText("The specified email already exists");
  await expect(page.locator("div.validation-summary-errors li")).toBeVisible(); 
  await expect(page).toHaveURL(`${config.baseURL}/register`)
})

test('uncreate user wrong confirm', async ({ page }) => {
    const authPage = hwRegisterPage({ page })

    await authPage.visit()
    await authPage.open()
    await authPage.chooseGender()
    await authPage.fillFirstName(`${config.firstName}`)
    await authPage.fillLastName(`${config.lastName}`)
    await authPage.fillEmail(`${config.email}`)
    await authPage.fillPassword(`${config.password}`)
    await authPage.fillConfirmPassword('Password321')

    await authPage.clickBtn()

    await expect(page.locator("span.field-validation-error span")).toHaveText("The password and confirmation password do not match.");
    await expect(page.locator("span.field-validation-error span")).toBeVisible(); // почему то если руками, то текст есть, если автотестом, то текст не появляется.. баг)
    await expect(page).toHaveURL(`${config.baseURL}/register`)
  })

  test('uncreate user wrong password', async ({ page }) => {
    const authPage = hwRegisterPage({ page })

    await authPage.visit()
    await authPage.open()
    await authPage.chooseGender()
    await authPage.fillFirstName(`${config.firstName}`)
    await authPage.fillLastName(`${config.lastName}`)
    await authPage.fillEmail(`${config.email}`)
    await authPage.fillPassword('S')
    await authPage.fillConfirmPassword('S')

    await authPage.clickBtn()

    await expect(page.locator("span.field-validation-error span")).toHaveText("The password should have at least 6 characters.");
    await expect(page.locator("span.field-validation-error span")).toBeVisible();
    await expect(page).toHaveURL(`${config.baseURL}/register`)
  })

// Тесты авторизации
  test('login title', async ({ page }) => {
    const authPage = hwLoginPage({ page })
    await authPage.visit()
    await authPage.open()
    
    await expect(page).toHaveTitle(/Demo Web Shop. Login/) // почему так, а не как ниже загадка! -> в head у title такой заголовок, почему то там смотрит, а не по тексту, возможно баг
    //await expect(page).toHaveTitle(/Welcome, Please Sign In!/)
  })
  test('success auth registrated user', async({ page })=>{
    const authPage = hwLoginPage({ page })
    await authPage.visit()
    await authPage.open()
    await authPage.fillEmail(`${config.email}`)
    await authPage.fillPassword(`${config.password}`)
    await authPage.clickBtnLogin()

    await expect(page).toHaveURL(`${config.baseURL}`)
    await expect(page.locator("div.header-links a.account")).toHaveText(`${config.email}`)
    await expect(page.locator("div.header-links a.ico-logout")).toHaveText('Log out')

    await page.locator('div.header-links a.ico-logout').click() 
  })
  test('email validation unRegistrated user', async({ page })=>{
    const authPage = hwLoginPage({ page })
    await authPage.visit()
    await authPage.open()
    await authPage.fillEmail("nodmitry@gmail.com")
    await authPage.clickBtnLogin()

    await expect(page.locator("div.validation-summary-errors span")).toHaveText("Login was unsuccessful. Please correct the errors and try again.");
    await expect(page.locator("div.validation-summary-errors span")).toBeVisible();
    await expect(page.locator("div.message-error li")).toHaveText("No customer account found");
    await expect(page.locator("div.message-error li")).toBeVisible();
  })
  test('auth btn ', async ({ page }) => {
    const authPage = hwLoginPage({ page })
    await authPage.visit()
    await authPage.open()
    await authPage.clickBtnAuth()
    
    await expect(page).toHaveURL(`${config.baseURL}/register`)
    //await expect(page).toHaveTitle(/Welcome, Please Sign In!/)
  })

  test('wrong pas auth', async ({ page }) => {
    const authPage = hwLoginPage({ page })
    await authPage.visit()
    await authPage.open()
    await authPage.fillEmail(`${config.email}`)
    await authPage.fillPassword("Sss")
    await authPage.clickBtnLogin()

    //await expect(page.locator("span.field-validation-error span")).toHaveText("");
    await expect(page.locator("div.validation-summary-errors span")).toBeVisible();
    //await expect(page.locator("span.field-validation-error span")).toHaveText("");
    await expect(page.locator("div.validation-summary-errors li")).toBeVisible();
    await expect(page).toHaveURL(`${config.baseURL}/login`)
  })
  test('email validation .com', async({ page })=>{
    const authPage = hwLoginPage({ page })
    await authPage.visit()
    await authPage.open()
    await authPage.fillEmail("dmitry@gmail")
    await authPage.clickBtnLogin()

    await expect(page.locator("span.field-validation-error span")).toHaveText("Please enter a valid email address.");
    await expect(page.locator("span.field-validation-error span")).toBeVisible();
  })
  test('email validation @', async({ page })=>{
    const authPage = hwLoginPage({ page })
    await authPage.visit()
    await authPage.open()
    await authPage.fillEmail("dmitrygmail.com")
    await authPage.clickBtnLogin()

    await expect(page.locator("span.field-validation-error span")).toHaveText("Please enter a valid email address.");
    await expect(page.locator("span.field-validation-error span")).toBeVisible();
  })

  //npx playwright test --headed 
  //npx playwright test hwAuth.spec.ts --headed  