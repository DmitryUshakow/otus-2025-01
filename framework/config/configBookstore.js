import 'dotenv/config'

// Object.freeze используем, чтобы запретить изменять конфиг,
// конфиг только для чтения
export default Object.freeze({
  // если хотим задать значения по-умолчанию, можно использовать оператор ??
  baseURL: process.env.TEST_BOOKSTORE_API_URL ?? 'https://bookstore.demoqa.com',
  userId: process.env.TEST_BOOKSTORE_USER_ID ?? '56476548-365e-4d60-86b4-d06d147c64ac',
  username: process.env.TEST_BOOKSTORE_USERNAME ?? 'Dmitry.ushakoff@gmail.com',
  password: process.env.TEST_BOOKSTORE_PASSWORD ?? 'Dmitry0!'
})
