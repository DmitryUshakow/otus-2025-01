import { test, expect } from "@playwright/test";

//HW JEST
test("check jest api titles", async ({ page }) => {
  await page.goto("https://jestjs.io/ru/");
  await page.locator("div.navbar__items--right a:nth-child(2)").click();
  await expect(page).toHaveTitle(/Глобальные значения/);
  //await expect("h2.anchor").toHaveText(/Методы/);
  //await expect(page.locator("h2.anchor")).toContainText(/Методы/);
  //почему то не работает
  await page.locator("nav.menu li:nth-child(2) a").click();
  await expect(page).toHaveTitle(/Expect/); //почему то точное значение в кавычках не принимает - ошибка
  await page.locator("nav.menu li:nth-child(3) a").click();
  await expect(page).toHaveTitle(/Mock-функции/);
  await page.locator("nav.menu li:nth-child(4) a").click();
  await expect(page).toHaveTitle(/Объект Jest/);
  await page.locator("nav.menu li:nth-child(5) a").click();
  await expect(page).toHaveTitle(/Настройка Jest/);
  await page.locator("nav.menu li:nth-child(6) a").click();
  await expect(page).toHaveTitle(/Опции командной строки Jest/);
  await page.locator("nav.menu li:nth-child(7) a").click();
  await expect(page).toHaveTitle(/Переменные среды/);
  await page.locator("nav.menu li:nth-child(8) a").click();
  await expect(page).toHaveTitle(/Преобразование кода/);
});

test("check main buttons", async ({ page }) => {
  await page.goto("https://jestjs.io/ru/");
  await page.locator("div.jest-button-container a:nth-child(1)").click();
  await expect(page).toHaveTitle(/Начало работы/);
  await expect(page).toHaveURL("https://jestjs.io/ru/docs/getting-started");
  await page.goBack();
  await page.locator("div.jest-button-container a:nth-child(2)").click();
  await expect(page).toHaveTitle(/Начало работы/);
  await expect(page).toHaveURL("https://jestjs.io/ru/docs/getting-started");
  await page.goBack();
  await page.locator("div.jest-button-container a:nth-child(3)").click();
  await expect(page).toHaveTitle(/Настройка Jest/);
  await expect(page).toHaveURL("https://jestjs.io/ru/docs/configuration");
  await page.goBack();
  await page.locator("div.jest-button-container a:nth-child(4)").click();
  await expect(page).toHaveURL("https://jestjs.io/ru/help");
});

test("check footer buttons", async ({ page }) => {
  await page.goto("https://jestjs.io/ru/");
  await page.locator("div.footer__col:nth-child(1) li:nth-child(1) a").click();
  await expect(page).toHaveTitle(/Начало работы/);
  await expect(page).toHaveURL("https://jestjs.io/ru/docs/getting-started");
  await page.goBack();
  await page.locator("div.footer__col:nth-child(1) li:nth-child(2) a").click();
  await expect(page).toHaveTitle(/Тестирование при помощи снимков/);
  await expect(page).toHaveURL("https://jestjs.io/ru/docs/snapshot-testing");
  await page.goBack();
  await page.locator("div.footer__col:nth-child(1) li:nth-child(3) a").click();
  await expect(page).toHaveTitle(/Глобальные значения/);
  await expect(page).toHaveURL("https://jestjs.io/ru/docs/api");
  await page.goBack();
  await page.locator("div.footer__col:nth-child(3) li:nth-child(1) a").click();
  await expect(page).toHaveURL("https://jestjs.io/ru/blog");
  // остальные с открытием в новой вкладке, как именно на второй вкладке проверить не понятно)) новую ссылку не принимает, предыдущую тоже(
});

test("check logos url", async ({ page }) => {
  await page.goto("https://jestjs.io/ru/");
  await page.locator("div.logos a:nth-child(3)").click();
  await expect(page).toHaveURL("https://www.nytimes.com/");
  await page.goBack();
  await page.locator("div.logos a:nth-child(4)").click();
  await expect(page).toHaveURL(
    "https://www.spotify.com/int/why-not-available/"
  );
  await page.goBack();
});
// для остальных нужен впн)))

test("check search", async ({ page }) => {
  await page.goto("https://jestjs.io/ru/");
  await page.locator("button.DocSearch.DocSearch-Button").click();
  await page.locator("form input").fill("api test");
  //await expect(page.locator("form input")).toHaveText(/api test/); почему то тоже не работать(
  await page.keyboard.press("Enter");
  // await expect(page).toHaveURL(
  //   "https://jestjs.io/ru/blog/2017/05/06/jest-20-delightful-testing-multi-project-runner#new--improved-testing-apis"
  // );
  // не может проверить наличие урла почему то
  // await page.goBack();
  //await page.locator("button.DocSearch.DocSearch-Button").click();
  // await page.locator("button.DocSearch-Hit-action-button").click();
  // почему то не получается повторно открыть поиск и кликнуть на кнопку удаления запроса из истроии..
});

test("check change lang", async ({ page }) => {
  await page.goto("https://jestjs.io/ru/");
  await page
    .locator("div.navbar__item.dropdown.dropdown--hoverable.dropdown--right")
    .hover();
  await page.locator("div.dropdown--right li:nth-child(1) a").click();
  await expect(page).toHaveURL("https://jestjs.io/");
  await page
    .locator("div.navbar__item.dropdown.dropdown--hoverable.dropdown--right")
    .focus();
  await page.locator("div.dropdown--right li:nth-child(7) a").click();
  await expect(page).toHaveURL("https://jestjs.io/ru/");
});

test("check jest doc titles", async ({ page }) => {
  await page.goto("https://jestjs.io/ru/");
  // await page
  //   .locator("div.navbar__items.navbar__items--right a:nth-child(1)")
  //   .click();
  // await page.getByRole("link", { name: "Начало работы", exact: true }).click();
  // const gettingStartedLink = page.locator(
  //   '//a[.//div[text()="Начало работы"]]'
  // );
  // await gettingStartedLink.click();
  // await expect(page).toHaveTitle(/Начало работы/);
  //  никак не переходит(((
  await page
    .locator("div.navbar__items.navbar__items--right a:nth-child(2)")
    .click();
  await expect(page).toHaveTitle(/Глобальные значения/);
  // await page.locator("ul a.table-of-contents__link").click();
  // await expect(
  //   page.locator("ul.breadcrumbs li:nth-child(3) span.breadcrumbs__link")
  // ).toBeVisible();
  //   // 1. Ждем загрузки страницы
  //   await page.waitForLoadState("networkidle");

  //   // 2. Используем стабильный локатор
  //   const gettingStartedLink = page.getByRole("link", {
  //     name: "Начало работы",
  //     exact: true,
  //   });

  //   // 3. Проверяем видимость и кликабельность
  //   await expect(gettingStartedLink).toBeVisible();
  //   await expect(gettingStartedLink).toBeEnabled();

  //   // 4. Кликаем с обработкой перехода
  //   await Promise.all([page.waitForNavigation(), gettingStartedLink.click()]);

  //   // 5. Проверяем результат
  //   await expect(page).toHaveTitle(/Начало работы/);
  // });
});

//await page.goBack();
// npx playwright test example.spec.js
// npx playwright test --debug

//npm update @playwright/test
//npx playwright codegen https://jestjs.io/ru/

// https://bluesleep.ru/

//https://testengineer.ru/playwright-tutorial/
