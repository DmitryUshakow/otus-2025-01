import config from '../config/configProjectHW'
import type { Page } from 'playwright-core'

export function hwNavMenuPage({ page }: { page: Page }) {
    const visit = async () => {
      await page.goto(`${config.baseURL}`)
    }
    const openBooks = async () => {
       //await page.locator("div.header-menu a", {hasText:'Books'}).first().click()
        await page.getByRole('link', { name: 'Books' }).first().click()
    }
    const openComputers = async () => {
        await page.getByRole('link', { name: 'Computers' }).first().click();
    }
    const openDesktops= async () => {
        await page.getByRole('link', { name: 'Desktops' }).first().click();
    }
    const openNotebooks= async () => {
        await page.getByRole('link', { name: 'Notebooks' }).first().click();
    }
    const openAccessories= async () => {
        await page.getByRole('link', { name: 'Accessories' }).first().click();
    }
    const openElectronics = async () => {
        await page.getByRole('link', { name: 'Electronics' }).first().click();
    }
    const openApparel = async () => {
        await page.getByRole('link', { name: 'Apparel & Shoes' }).first().click();
    }
    const openDigital = async () => {
        await page.getByRole('link', { name: 'Digital downloads' }).first().click();
    }
    const openJewelry = async () => {
        await page.getByRole('link', { name: 'Jewelry' }).first().click();
    }
    const openGiftCards = async () => {
        await page.getByRole('link', { name: 'Gift Cards' }).first().click();
    }
    return {
        visit,
        openBooks,
        openComputers,
        openDesktops,
        openNotebooks,
        openAccessories,
        openElectronics,
        openApparel,
        openDigital,
        openJewelry,
        openGiftCards,
    }
}
// по идее я отдельно буду описывать страницы, например book без перехода на нее, я буду брать бефор ол из нав меню и потом уже тесты по странице с книгами или сразу переход по урлу