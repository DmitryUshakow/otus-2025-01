import config from '../config/hwConfig'
import type { Page } from 'playwright-core'

export function hwLoginPage({ page }: { page: Page }) {
    const visit = async () => {
        await page.goto(`${config.baseURL}/customer/account/login`)//https://magento.softwaretestingboard.com/customer/account/login
    }
    const fillEmail = async (email: string) => {
        await page.locator("#email").fill(email)
    }
    const fillPassword = async (password: string) => {
        await page.locator("#pass").fill(password)
    }
    const signInBtn = async () => {
        await page.locator("#send2").click()
    }
    const forgotPasBtn = async () => {
        await page.getByRole('link', { name: 'Forgot Your Password?' }).click()
    }
    const createBtn = async () => {
        await page.locator('#maincontent').getByRole('link', { name: 'Create an Account' }).click();
    }
    return{
        visit,
        fillEmail,
        fillPassword,
        signInBtn,
        forgotPasBtn,
        createBtn,
    }
}