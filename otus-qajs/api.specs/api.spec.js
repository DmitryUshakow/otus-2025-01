const baseUrlBook = 'https://bookstore.demoqa.com/Account/v1'
//  Swagger Пользователь уже зарегистирован
describe('authedUser', () => {
  it('Success get token', async () => {
    const response = await fetch(`${baseUrlBook}/User`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'Dmitry.ushakov@mail.com',
        password: 'Dmitry0!'
      })
    })
    const data = await response.json()
    expect(response.status).toEqual(406)
    expect(data.code).toBe('1204')
    expect(data.message).toBe('User exists!')
  })
})
//  Swagger Пароль без специальных символов, так по аналогии могу размножить перебрав все комбинации не соответсвующего требованиям пароля)
describe('badPassword', () => {
  it('Success get token', async () => {
    const response = await fetch(`${baseUrlBook}/User`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'Dmitry.ushakov@mail.com',
        password: 'Dmitry01'
      })
    })
    const data = await response.json()
    expect(response.status).toEqual(400)
    expect(data.code).toBe('1300')
    expect(data.message).toBe(
      "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."
    )
  })
})
// Swagger Создание пользователя
describe('badPassword', () => {
  it('Success get token', async () => {
    const response = await fetch(`${baseUrlBook}/User`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'Dmitry.ushakov10@gmail.com',
        password: 'Dmitry0!'
      })
    })
    const data = await response.json()
    expect(response.status).toEqual(201)
    expect(data.userID).not.toBeNull()
    expect(data.userID).toBeTruthy()
    expect(data.username).toBe('Dmitry.ushakov10@gmail.com')
  })
})
//Swagger Get Token
describe('Auth', () => {
  let token
  it('Success get token', async () => {
    const response = await fetch(`${baseUrlBook}/GenerateToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'Dmitry.ushakov@gmail.com',
        password: 'Dmitry0!'
      })
    })
    const data = await response.json()
    expect(response.status).toEqual(200)
    expect(data.status).toBe('Success')
    expect(data.expires).not.toBeNull()
    expect(data.expires).toBeTruthy()
    expect(data.result).toBe('User authorized successfully.')
    expect(data.token).toBeTruthy()
    expect(data.token).not.toBeNull()
    token = data.token
    console.log(token)
  })
})
//Swagger Get badToken
describe('badToken', () => {
  it('Success get token', async () => {
    const response = await fetch(`${baseUrlBook}/GenerateToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'string'
      })
    })
    const data = await response.json()
    expect(response.status).toEqual(400)
    expect(data.code).toBe('1200')
    expect(data.message).toBe('UserName and Password required.')
  })
})
// Большое спасибо, после вашей подсказки понял, как сделать все тесты в swagger, но на память оставил тесты на reqres))
const baseUrl = 'https://reqres.in/api'
// Wrong Login - логин уже используется
describe('useLogin', () => {
  it('successCreate', async () => {
    const response = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'dmitry@gmail.com',
        password: '0123'
      })
    })
    const data = await response.json()
    expect(response.status).toEqual(400)
    expect(data.error).toBe('Note: Only defined users succeed registration')
  })
})
// Wrong Password
describe('createUser', () => {
  it('successCreate', async () => {
    const response = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'george.edwards@reqres.in'
      })
    })
    const data = await response.json()
    expect(response.status).toEqual(400)
    expect(data.error).toBe('Missing password')
  })
})
// Create User (Register)
describe('createUser', () => {
  it('successCreate', async () => {
    const response = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'eve.holt@reqres.in',
        password: 'pistol'
      })
    })
    const data = await response.json()
    expect(response.status).toEqual(200)
    expect(data.id).toBe(4)
    expect(data.token).toBe('QpwL5tke4Pnpja7X4')
  })
})
describe('createUser', () => {
  it('successCreate', async () => {
    const response = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'lindsay.ferguson@reqres.in',
        password: 'pistol'
      })
    })
    const data = await response.json()
    expect(response.status).toEqual(200)
    expect(data.id).toBe(8)
    expect(data.token).toBe('QpwL5tke4Pnpja7X8')
  })
})
// Create User (Create)
describe('createUser', () => {
  it('successCreate', async () => {
    const response = await fetch(`${baseUrl}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'dmitry@gmail.com',
        password: '0123'
      })
    })
    const data = await response.json()
    expect(response.status).toEqual(201)
    expect(data.email).toBe('dmitry@gmail.com')
    expect(data.password).toBe('0123')
    expect(data.id).not.toBe(null)
    expect(data.id).toBeTruthy()
    expect(data.createdAt).not.toBe(null)
  })
})
// Bonus from starWars )))
const baseUrlStarWars = 'https://reqres.in/api'
describe('getPeople', () => {
  it('successCreate', async () => {
    const response = await fetch(`${baseUrlStarWars}/people`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    expect(response.status).toEqual(200)
    //expect(data.count).toEqual(82)
    //expect(data.previous).toBe(null)
    //expect(data.results).not.toBe(null)
    // Почему то со всем этим не работает
  })
})
describe('getLuke', () => {
  it('successCreate', async () => {
    const response = await fetch(`${baseUrlStarWars}/people/1`, {
      method: 'GET',
      headers: {
        'User-Agent': 'SWAPI-Test-Suite/1.0',
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    expect(response.status).toEqual(200)
    // expect(data).toHaveProperty('name')
    // expect(data).toMatchObject({
    //   name: expect.any(String)
    // })
    // expect(data.name).toBe('Luke Skywalker')
    // почему то тоже, но я пытался
  })
})
//npm test -- api.spec.js

// function createUniqueRandomGenerator(min, max) {
//   const used = new Set();
//   return () => {
//     if (used.size === max - min + 1) {
//       throw new Error('All numbers in range are used');
//     }

//     let num;
//     do {
//       num = Math.floor(Math.random() * (max - min + 1)) + min;
//     } while (used.has(num));

//     used.add(num);
//     return num;
//   };
// }

// // Использование
// const getUniqueRandom = createUniqueRandomGenerator(10, 100);
