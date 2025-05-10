import type { Page } from 'playwright-core'

export function hwProductsPage({ page }: { page: Page }) {
    const homeBtn = async () => {
        await page.locator('div.breadcrumb a', {hasText:'Home'}).click()
    }
    // Сортировка
    const sortBySelector = async () => {
        await page.locator('select#products-orderby').click()
      }
    const sortPosition = async () => {
      await page.locator('select#products-orderby option', {hasText:'Position'}).click()
    }
    const sortNameAtoZ = async () => {
        await page.locator('select#products-orderby option', {hasText:'Name: A to Z'}).click()
    }
    const sortNameZtoA = async () => {
        await page.locator('select#products-orderby option', {hasText:'Name: Z to A'}).click()
    }
    const sortPriceLtoH = async () => {
        await page.locator('select#products-orderby option', {hasText:'Price: Low to High'}).click()
    }
    const sortPriceHtoL = async () => {
        await page.locator('select#products-orderby option', {hasText:'Price: High to Low'}).click()
    }
    const sortCreate = async () => {
        await page.locator('select#products-orderby option', {hasText:'Created on'}).click()
    }
    // Пагинация
    const pagePagination = async () => {
        await page.locator('select#products-pagesize').click()
    }
    const pagePagination4 = async () => {
        await page.locator('select#products-pagesize option', {hasText:'4'}).click()
    }
    const pagePagination8 = async () => {
        await page.locator('select#products-pagesize option', {hasText:'8'}).click()
    }
    const pagePagination12 = async () => {
        await page.locator('select#products-pagesize option', {hasText:'12'}).click()
    }
    // Отображение
    const pageViewMode = async () => {
        await page.locator('select#products-viewmode').click()
    }
    const pageViewModeGrid = async () => {
        await page.locator('select#products-viewmode option', {hasText:'Grid'}).click()
    }
    const pageViewModeList = async () => {
        await page.locator('select#products-viewmode option', {hasText:'List'}).click()
    }
    // description of products
    const bookProduct = async () => {
        await page.locator('div.item-box a').first().click()
    }
    const bookProductFiction = async () => {
        //await page.locator('div.item-box a', {hasText:'Fiction'}).click()
        await page.getByRole('link', { name: 'Fiction', exact: true }).click()
    }
    const bookProductHealth = async () => {
        await page.getByRole('link', { name: 'Health Book', exact: true }).click()
    }
    const computersDesctops = async () => {
        await page.locator('div.sub-category-grid div.item-box a', {hasText:'Desctops'}).click()
    }
    const computersNotebooks = async () => {
        //await page.locator('div.sub-category-grid div.item-box a', {hasText:'14.1-inch Laptop'}).click()
        await page.getByRole('link', { name: '14.1-inch Laptop', exact: true }).click();
    }
    const computersAccessories = async () => {
        await page.locator('div.sub-category-grid div.item-box a', {hasText:'Accessories'}).click()
    }
    const desctopProduct = async () => {
        await page.locator('div.item-box a').first().click()
    }
    const desctopProductElitePC = async () => {
        await page.locator('div.item-box a', {hasText:'Elite Desktop PC'}).click()
    }
    const notebookProductLink = async () => {
        await page.locator('div.item-box a', {hasText:'14.1-inch Laptop'}).click()
    }
    const notebookProductBtn = async () => {
        //await page.locator('div.buttons input', {hasText:'Add to cart'}).click()//value? not text?
        await page.locator('input#add-to-cart-button-22').click()
    }
    return {
        homeBtn,
        sortBySelector,
        sortPosition,
        sortNameAtoZ,
        sortNameZtoA,
        sortPriceLtoH,
        sortPriceHtoL,
        sortCreate,
        pagePagination,
        pagePagination4,
        pagePagination8,
        pagePagination12,
        pageViewMode,
        pageViewModeGrid,
        pageViewModeList,
        bookProduct,
        bookProductFiction,
        bookProductHealth,
        computersDesctops,
        computersNotebooks,
        computersAccessories,
        desctopProduct,
        desctopProductElitePC,
        notebookProductLink,
        notebookProductBtn,
    }
}