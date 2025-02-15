import 'dotenv/config'

// Object.freeze используем, чтобы запретить изменять конфиг,
// конфиг только для чтения
export default Object.freeze({
  // если хотим задать значения по-умолчанию, можно использовать оператор ??
  baseURL: process.env.TEST_BOOKSTORE_API_URL ?? 'https://bookstore.demoqa.com',
  userId: process.env.TEST_BOOKSTORE_USER_ID ?? '6defafb5-b96e-491c-ace3-7d71a73b6306',
  username: process.env.TEST_BOOKSTORE_USERNAME ?? '3Dmitry@gmail.com',
  password: process.env.TEST_BOOKSTORE_PASSWORD ?? 'Dmitry0!',
  token:
    process.env.TEST_BOOKSTORE_TOKEN ??
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IjNEbWl0cnlAZ21haWwuY29tIiwicGFzc3dvcmQiOiJEbWl0cnkwISIsImlhdCI6MTczOTU2NDIzMX0.A4VJpJ5xLzjbuux43gEhTEQij6FIx_a5XZCtjykwYz4',
  userIdDelete: process.env.TEST_BOOKSTORE_USER_ID ?? 'bbe441bd-cca5-4f1b-9f72-ba36d8ec3cfd',
  tokenDelete:
    process.env.TEST_BOOKSTORE_TOKEN ??
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkRtaXRyeS51c2hha293QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiRG1pdHJ5MCEiLCJpYXQiOjE3Mzk1NjU2NjB9.NnLnB5xPDMyiWUx4eFWSUYtsLbQG8MU9rzKs3PbV8Qs'
})
