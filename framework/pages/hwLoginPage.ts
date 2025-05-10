import config from '../config/configProjectHW'
import type { Page } from 'playwright-core'

export function hwLoginPage({ page }: { page: Page }){
    const visit = async () => {
        await page.goto(`${config.baseURL}`)
    }
    const open = async () => {
        await page.locator("div.header-links a", {hasText: 'Log in'}).click()
    }
    const fillEmail = async (email: string) => {
        await page.locator("input#Email").fill(email)
    }
    const fillPassword = async (password: string) => {
        await page.locator("input#Password").fill(password)
    }
    const clickBtnLogin = async () => {
        await page.locator("div.buttons input", { hasText: "Log in" }).click()
    }
    const clickBtnAuth = async () => {
        await page.locator("div.buttons input", { hasText: "Register" }).click()
    }
    const accountBtn = async () => {
        await page.locator("div.header-links a.account").click()
    }
return {
    visit,
    open,
    fillEmail,
    fillPassword,
    clickBtnLogin,
    clickBtnAuth,
    accountBtn,
}
}