import 'dotenv/config'

export default Object.freeze({
baseURL: process.env.TEST_DEMOSTORE_URL ?? 'https://demowebshop.tricentis.com',
firstName: process.env.TEST_DEMOSTORE_USERNAME as string ?? 'Max',
lastName: process.env.TEST_DEMOSTORE_USERLASTNAME as string ?? 'Ivanov',
email: process.env.TEST_DEMOSTORE_USEREMAIL as string ?? 'ma016@gmail.com',//08
password: process.env.TEST_DEMOSTORE_PASSWORD as string ?? 'Password32!',
//confirmPas: process.env.TEST_DEMOSTORE_CONFPASSWORD as string ?? 'Password32!',
})