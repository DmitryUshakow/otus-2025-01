import config from '../config/configProjectHW'
import type { Page } from 'playwright-core'

export function hwShopPage({ page }: { page: Page }){
    const visit = async () => {
        await page.goto(`${config.baseURL}`)
    }
    const open = async () => {
        await page.locator("div.header-links a", {hasText: 'Shopping cart'}).click()
    }
    return {
        visit,
        open
    }
}