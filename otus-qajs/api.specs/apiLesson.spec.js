const baseUrl = 'https://reqres.in/api'
;(async () => {
  try {
    // This is GET request
    // const response = await fetch(`${baseUrl}/users`) // Promise
    // const data = await response.json() // .blob() .text()
    // Than is POST request
    const body = { name: 'Iden', job: 'new_job' }
    const response = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const data = await response.json() // .blob() .text()
    console.log('status', response.status) // response.headers
    console.log('data', data)
  } catch (error) {
    console.error('Не получилось получить список юзеров', error)
  }
})()
//succesful token
describe('Auth', () => {
  let token
  it('Success login', async () => {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'emilys',
        password: 'emilyspass'
      }),
      expiresInMins: 30
    })
    const data = await response.json()
    expect(response.status).toEqual(200)
    expect(data.username).toBe('emilys')
    expect(data.accessToken).toBeTruthy()
    token = data.accessToken
    console.log(token)
  })
})
describe('Auth', () => {
  it('Failed login', async () => {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'kminchelle',
        password: 'wrongpassword'
      }),
      expiresInMins: 30
    })
    const data = await response.json()
  })
})

//npm test -- apiLesson.spec.ls
