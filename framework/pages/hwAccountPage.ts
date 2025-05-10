//import config from '../config/configProjectHW'
import type { Page } from 'playwright-core'

export function hwAccountPage({ page }: { page: Page }){
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
    const saveBtn = async () => {
        await page.locator("div.buttons input.save-customer-info-button").click()
    }
    return {
        chooseGender,
        fillFirstName,
        fillLastName,
        fillEmail,
        saveBtn,
    }
}