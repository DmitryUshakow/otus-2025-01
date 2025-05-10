import config from '../config/configProjectHW'
import type { Page } from 'playwright-core'

export function hwCompareList({ page }: { page: Page }) {
    const visit = async () => {
        await page.goto(`${config.baseURL}/compareproducts`)
    }
    const clearListBtn = async () => {
        await page.locator('a.clear-list').click()
    }
    const removeBtn = async () => {
        await page.locator('input.remove-button').click()
    }
    return {
        visit,
        clearListBtn,
        removeBtn,  
    }
}