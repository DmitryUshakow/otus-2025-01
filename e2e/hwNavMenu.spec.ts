import config from '../framework/config/configProjectHW'
import { test, expect } from '@playwright/test'
import { hwNavMenuPage } from '../framework/pages'

// Проверки навигационного меню
test ('click on Books btn', async ({page}) => {
  const NavMenuPage = hwNavMenuPage({ page })
  await NavMenuPage.visit()
  await NavMenuPage.openBooks()

  await expect(page).toHaveTitle(/Books/)
  await expect(page).toHaveURL(`${config.baseURL}/books`)
})
test ('click on Computers btn', async ({page}) => {
  const NavMenuPage = hwNavMenuPage({ page })
  await NavMenuPage.visit()
  await NavMenuPage.openComputers()

  await expect(page).toHaveTitle(/Computers/)
  await expect(page).toHaveURL(`${config.baseURL}/computers`)
})
test ('click on Desktops btn', async ({page}) => {
  const NavMenuPage = hwNavMenuPage({ page })
  await NavMenuPage.visit()
  await NavMenuPage.openComputers()
  await NavMenuPage.openDesktops()

  await expect(page).toHaveTitle(/Desktops/)
  await expect(page).toHaveURL(`${config.baseURL}/desktops`)
})
test ('click on Notebooks btn', async ({page}) => {
  const NavMenuPage = hwNavMenuPage({ page })
  await NavMenuPage.visit()
  await NavMenuPage.openComputers()
  await NavMenuPage.openNotebooks()

  await expect(page).toHaveTitle(/Notebooks/)
  await expect(page).toHaveURL(`${config.baseURL}/notebooks`)
})
test ('click on Accessories btn', async ({page}) => {
  const NavMenuPage = hwNavMenuPage({ page })
  await NavMenuPage.visit()
  await NavMenuPage.openComputers()
  await NavMenuPage.openAccessories()

  await expect(page).toHaveTitle(/Accessories/)
  await expect(page).toHaveURL(`${config.baseURL}/accessories`)
})
// И так далее)))
//npx playwright test hwNavMenu.spec.ts --headed