import config from '../config/configProjectHW'
import type { Page } from 'playwright-core'

export function hwWishPage({ page }: { page: Page }){
    const visit = async () => {
        await page.goto(`${config.baseURL}`)
    }
    const open = async () => {
        await page.locator("div.header-links a", {hasText: 'Wishlist'}).click()
    }
    return {
        visit,
        open
    }
}