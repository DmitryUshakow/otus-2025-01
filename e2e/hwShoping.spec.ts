import config from '../framework/config/configProjectHW'
import { test, expect } from '@playwright/test'
import { hwShopPage, hwWishPage, hwNavMenuPage, hwProductsPage, hwProductTiketPage, hwCompareList } from '../framework/pages'

test('shop Title', async ({ page }) => {
  const ShopPage = hwShopPage({ page })
  await ShopPage.visit()
  await ShopPage.open()
  
  await expect(page).toHaveTitle(/Demo Web Shop. Shopping Cart/)
  //await expect(page).toHaveTitle(/Shopping cart/)
})
test('shop empty state', async ({ page }) => {
    const ShopPage = hwShopPage({ page })
    await ShopPage.visit()
    await ShopPage.open()
    
    //await expect(page.locator("div.page-body div.wishlist-content")).toHaveText("Your Shopping Cart is empty!")
    await expect(page.getByText('Your Shopping Cart is empty!')).toHaveText(/Your Shopping Cart is empty! /)
})
test('wish Title', async ({ page }) => {
  const WishPage = hwWishPage({ page })
  await WishPage.visit()
  await WishPage.open()
  
  await expect(page).toHaveTitle(/Wishlist/)
})

test('wish empty state', async ({ page }) => {
    const WishPage = hwWishPage({ page })
    await WishPage.visit()
    await WishPage.open()
    
    //await expect(page.locator("div.wishlist-content", { hasText: /Your Shopping Cart is empty!/ })).toHaveValue(/Your Shopping Cart is empty!/)
    await expect(page.getByText('The wishlist is empty!')).toHaveText(/The wishlist is empty! /)
})

test ('edit book product in wishbox', async ({page}) => {
  const NavMenuPage = hwNavMenuPage({ page })
  await NavMenuPage.visit()
  await NavMenuPage.openBooks()
  const ProductsPage = hwProductsPage({ page })
  await ProductsPage.bookProductHealth()
  const ProductTiketPage = hwProductTiketPage({ page })
  await ProductTiketPage.addWishBtn()

  await expect(page.locator("div#bar-notification")).toHaveText(/The product has been added to your /)
  await expect(page.locator("div#bar-notification")).toHaveText(/wishlist/)
})

test ('edit book product in shopping list', async ({page}) => {
  const NavMenuPage = hwNavMenuPage({ page })
  await NavMenuPage.visit()
  await NavMenuPage.openBooks()
  const ProductsPage = hwProductsPage({ page })
  await ProductsPage.bookProductHealth()
  const ProductTiketPage = hwProductTiketPage({ page })
  await ProductTiketPage.addShopBtn()

  await expect(page.locator("div#bar-notification")).toHaveText(/The product has been added to your /)
  await expect(page.locator("div#bar-notification")).toHaveText(/shopping cart/)
})

test ('edit book product in compare list', async ({page}) => {
  const NavMenuPage = hwNavMenuPage({ page })
  await NavMenuPage.visit()
  await NavMenuPage.openBooks()
  const ProductsPage = hwProductsPage({ page })
  await ProductsPage.bookProductHealth()
  const ProductTiketPage = hwProductTiketPage({ page })
  await ProductTiketPage.compareListBtn()

  await expect(page).toHaveURL(`${config.baseURL}/compareproducts`)
  await expect(page.locator("tr.product-name a")).toHaveText(/Health Book/)
})
test ('clear notebook from compare list', async ({page}) => {
  const NavMenuPage = hwNavMenuPage({ page })
  await NavMenuPage.visit()
  await NavMenuPage.openComputers()
  await NavMenuPage.openNotebooks()
  const ProductsPage = hwProductsPage({ page })
  await ProductsPage.computersNotebooks()
  const ProductTiketPage = hwProductTiketPage({ page })
  await ProductTiketPage.compareListBtn()

  await expect(page).toHaveURL(`${config.baseURL}/compareproducts`)
  await expect(page.locator("tr.product-name a")).toHaveText(/14.1-inch Laptop/)

  const compareList = hwCompareList({ page })
  await compareList.clearListBtn()

  await expect(page.getByText('You have no items to compare.')).toHaveText(/You have no items to compare. /)
})
test ('remove notebook from shopping cart', async ({page}) => {
  const NavMenuPage = hwNavMenuPage({ page })
  await NavMenuPage.visit()
  await NavMenuPage.openComputers()
  await NavMenuPage.openNotebooks()
  const ProductsPage = hwProductsPage({ page })
  await ProductsPage.computersNotebooks()
  const ProductTiketPage = hwProductTiketPage({ page })
  await ProductTiketPage.addShopBIdBtn()
  await page.locator('p.content a').click() //
  
  await expect(page).toHaveURL(`${config.baseURL}/cart`)
  await expect(page.locator("td.product a")).toHaveText(/14.1-inch Laptop/)

  await ProductTiketPage.removeBtn()
  await ProductTiketPage.orderSumBtn()

  //Не знаю почему, но не получается найти элемент,пробовал взять от playwright, но не подходит почему то, сам писал тоже
  //await expect(page.getByText('Your Shopping Cart is empty!')).toBeVisible()
  //await expect(page.getByText('Your Shopping Cart is empty!')).toHaveText(/Your Shopping Cart is empty! /)
  //await expect(page.getByText('div.page-body div.order-summary-content')).toHaveText(/Your Shopping Cart is empty! /)
})

//npx playwright test hwShoping.spec.ts --headed 