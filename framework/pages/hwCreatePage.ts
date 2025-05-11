import config from '../config/hwConfig'
import type { Page } from 'playwright-core'

export function hwCreatePage({ page }: { page: Page }) {
    const visit = async () => {
        await page.goto(`${config.baseURL}/customer/account/create/`)
    }
    const fillFirstName = async (firstName: string) => {
        await page.locator("#firstname").fill(firstName)
    }
    const fillLastName = async (lastName: string) => {
        await page.locator("#lastname").fill(lastName)
    }
    const fillEmail = async (email: string) => {
        await page.locator("#email_address").fill(email)
    }
    const fillPassword = async (password: string) => {
        await page.locator("#password").fill(password)
    }
    const fillConfirmPassword = async (password: string) => {
        await page.locator("#password-confirmation").fill(password)
    }
    const createBtn = async () => {
        await page.getByRole('button', { name: 'Create an Account' }).click()
    }
    return{
        visit,
        fillFirstName,
        fillLastName,
        fillEmail,
        fillPassword,
        fillConfirmPassword,
        createBtn,
    }
}