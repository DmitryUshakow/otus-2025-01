import config from '../config/configProjectHW'
import type { Page } from 'playwright-core'

export function hwRegisterPage({ page }: { page: Page }) {
    const visit = async () => {
      await page.goto(`${config.baseURL}`)
    }
    const open = async () => {
        await page.locator("div.header-links a", { hasText: "Register" }).click()
    }
    const chooseGender = async () => {
        await page.locator("input#gender-male").click()
    }
    const fillFirstName = async (firstName: string) => {
        await page.locator("input#FirstName").fill(firstName)
    }
    const fillLastName = async (lastName: string) => {
        await page.locator("input#LastName").fill(lastName)
    }
    const fillEmail = async (email: string) => {
        await page.locator("input#Email").fill(email)
    }
    const fillPassword = async (password: string) => {
        await page.locator("input#Password").fill(password)
    }
    const fillConfirmPassword = async (confirmPas: string) => {
        await page.locator("input#ConfirmPassword").fill(confirmPas)
    }
    const clickBtn = async () => {
        await page.locator("input#register-button").click()
    }
    const clickContinueBtn = async () => {
    await page.locator('div.buttons input.register-continue-button').click()
    }
    const clickLogoutBtn = async () => {
    await page.locator('div.header-links a.ico-logout').click() 
    }
    return {
        visit,
        open,
        chooseGender,
        fillFirstName,
        fillLastName,
        fillEmail,
        fillPassword,
        fillConfirmPassword,
        clickBtn,
        clickContinueBtn,
        clickLogoutBtn,
    }
}