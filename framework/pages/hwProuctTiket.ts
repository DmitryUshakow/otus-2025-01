import type { Page } from 'playwright-core'

export function hwProductTiketPage({ page }: { page: Page }) {
    const qtyChangeInput = async () => {
        await page.locator('input#addtocart_22_EnteredQuantity').click()
        await page.locator('input#addtocart_22_EnteredQuantity').fill('2')
    }
    const addShopBtn = async () => {
        await page.locator('input#add-to-cart-button-22').click() //edit book product in shopping list
        //await page.locator('input#add-to-cart-button-31').click() //remove notebook from shopping cart нужно не по id, он почему то у всех разный для каждого товара...
    }
    const addShopBIdBtn = async () => {
        await page.locator('input#add-to-cart-button-31').click()
    }
    const addWishBtn = async () => {
        await page.locator('input#add-to-wishlist-button-22').click()
    }
    const emailFriendBtn = async () => {
        await page.locator('div.email-a-friend input', {hasText:'Email a friend'}).click()//value? not text? но тут можно и без тескта обойтись, но локатор станет слабым
    }
    const compareListBtn = async () => {
        //await page.getByRole('button', { name: 'Add to compare list' }).click();
        await page.locator('div.compare-products input').click() // div.compare-products input.add-to-compare-list-button
    }
    const removeBtn = async () => {
    await page.locator('td.remove-from-cart input').click()
    }
    const orderSumBtn = async () => {
        await page.locator('div.page-body div.order-summary-content').click();
    }

    return {
        qtyChangeInput,
        addShopBtn,
        addShopBIdBtn,
        addWishBtn,
        emailFriendBtn,
        compareListBtn,
        removeBtn,
        orderSumBtn,
    }
}