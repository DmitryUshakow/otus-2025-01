import 'dotenv/config'

export default Object.freeze({
baseURL: process.env.TEST_DEMOSTORE_URL ?? 'https://magento.softwaretestingboard.com',
firstName: process.env.TEST_DEMOSTORE_USERNAME as string ?? 'Dmitry',
lastName: process.env.TEST_DEMOSTORE_USERLASTNAME as string ?? 'Ushakoff',
newEmail: process.env.TEST_DEMOSTORE_USEREMAIL as string ?? 'DUff1@gmail.com',
registratedEmail: process.env.TEST_DEMOSTORE_USEREMAIL as string ?? 'DUf@gmail.com',
password: process.env.TEST_DEMOSTORE_PASSWORD as string ?? 'Password32!',
})