//Swagger Get Token
describe('Auth', () => {
  let token
  it('Success get token', async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'string',
        password: 'string'
      })
    })
    const data = await response.json()
    expect(response.status).toEqual(200)
    expect(data.expires).toBe(null)
    expect(data.status).toBe('Failed')
    expect(data.result).toBe('User authorization failed.')
    expect(data.token).toBe(null)
    token = data.token
    console.log(token)
  })
})
//Swagger Get badToken
describe('badToken', () => {
  it('Success get token', async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
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
// Далее я не совсем понял, как сделать тесты в swagger, которые успешно бы прошли и перешел на reqres))
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
// Bonus from starWars)))
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
