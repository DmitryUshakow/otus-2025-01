import config from '../framework/config/hwConfig'
import { test, expect } from '@playwright/test'
import { hwCreatePage, hwLoginPage } from '../framework'

test('create fields validation ', async ({ page }) => {
    const createPage = hwCreatePage({ page })
    await createPage.visit()
    await createPage.createBtn()
    
    await expect(page.locator("#firstname-error")).toHaveText("This is a required field.")
    await expect(page.locator("#firstname-error")).toBeVisible()
    await expect(page.locator("#lastname-error")).toHaveText("This is a required field.")
    await expect(page.locator("#lastname-error")).toBeVisible()
    await expect(page.locator("#email_address-error")).toHaveText("This is a required field.")
    await expect(page.locator("#email_address-error")).toBeVisible()
    await expect(page.locator("#password-error")).toHaveText("This is a required field.")
    await expect(page.locator("#password-error")).toBeVisible()
    await expect(page.locator("#password-confirmation-error")).toHaveText("This is a required field.")
    await expect(page.locator("#password-confirmation-error")).toBeVisible()
})
test('wrong confirm password', async ({ page }) => {
    const createPage = hwCreatePage({ page })
    await createPage.visit()
    await createPage.fillFirstName(`${config.firstName}`)
    await createPage.fillLastName(`${config.lastName}`)
    await createPage.fillEmail(`${config.newEmail}`)
    await createPage.fillPassword(`${config.password}`)
    await createPage.fillConfirmPassword('Password321')
    await createPage.createBtn()
    
    await expect(page.locator("#password-confirmation-error")).toHaveText("Please enter the same value again.")
    await expect(page.locator("#password-confirmation-error")).toBeVisible()
    await expect(page).toHaveURL(`${config.baseURL}/customer/account/create/`)
})
test('success creating new user', async ({ page }) => {
    const createPage = hwCreatePage({ page })
    await createPage.visit()
    await createPage.fillFirstName(`${config.firstName}`)
    await createPage.fillLastName(`${config.lastName}`)
    await createPage.fillEmail(`${config.newEmail}`)
    await createPage.fillPassword(`${config.password}`)
    await createPage.fillConfirmPassword(`${config.password}`)
    await createPage.createBtn()
    
    await expect(page).toHaveURL(`${config.baseURL}/customer/account/`)
})
test('creating registrated user', async ({ page }) => {
    const createPage = hwCreatePage({ page })
    await createPage.visit()
    await createPage.fillFirstName(`${config.firstName}`)
    await createPage.fillLastName(`${config.lastName}`)
    await createPage.fillEmail(`${config.registratedEmail}`)
    await createPage.fillPassword(`${config.password}`)
    await createPage.fillConfirmPassword(`${config.password}`)
    await createPage.createBtn()
    
    await expect(page).toHaveURL(`${config.baseURL}/customer/account/create/`)
    await expect(page.locator("div.message-error")).toHaveText(/There is already an account with this email address. If you are sure that it is your email address, /)
    await expect(page.locator("div.message-error")).toBeVisible()
})
test('success login', async ({ page }) => {
    const loginPage = hwLoginPage({ page })
    await loginPage.visit()
    await loginPage.fillEmail(`${config.registratedEmail}`)
    await loginPage.fillPassword(`${config.password}`)
    await loginPage.signInBtn()
    
    await expect(page).toHaveURL(`${config.baseURL}/customer/account/`)
    await expect(page.locator("h1.page-title")).toHaveText(/My Account/)
    await expect(page.locator("h1.page-title")).toBeVisible()
})
test('forgot pas', async ({ page }) => {
    const loginPage = hwLoginPage({ page })
    await loginPage.visit()
    await loginPage.forgotPasBtn()
    
    await expect(page).toHaveURL(`${config.baseURL}/customer/account/forgotpassword/`)
    await expect(page.locator("h1.page-title")).toHaveText(/Forgot Your Password?/)
    await expect(page.locator("h1.page-title")).toBeVisible()
})
test('go to create', async ({ page }) => {
    const loginPage = hwLoginPage({ page })
    await loginPage.visit()
    await loginPage.createBtn()
    
    await expect(page).toHaveURL(`${config.baseURL}/customer/account/create/`)
    await expect(page.locator("h1.page-title")).toHaveText(/Create New Customer Account/)
    await expect(page.locator("h1.page-title")).toBeVisible()
})