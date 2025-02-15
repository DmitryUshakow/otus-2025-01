import config from '../../framework/config/configBookstore'
import { AuthService } from '../../framework'
jest.setTimeout(10000)
describe('Авторизация', () => {
  //ЭТОТ тест МЕНЯЕТ МНЕ ТОКЕН поэтому закоментил его
  // it('Успешная авторизация', async () => {
  //   const response = await AuthService.generateToken({
  //     userName: config.username,
  //     password: config.password
  //   })
  //   expect(response.status).toBe(200)
  //   expect(response.data.result).toBe('User authorized successfully.')
  //   expect(response.data.token).toBeDefined()
  // })

  it('Нельзя авторизоваться без пароля', async () => {
    const response = await AuthService.generateToken({
      userName: config.username,
      password: ''
    })
    expect(response.status).toBe(400)
    expect(response.data.code).toBe('1200')
    expect(response.data.message).toBe('UserName and Password required.')
  })
  it('получение пользователя', async () => {
    const response = await AuthService.getUser()
    expect(response.status).toBe(200)
    //const data = await response.json()
    expect(response.data.userId).toBe(`${config.userId}`) //.toBe(`6defafb5-b96e-491c-ace3-7d71a73b6306`)
    expect(response.data.username).toBe(`${config.username}`) //.toBe('3Dmitry@gmail.com')
  })
  it('получение НЕ авторизованного пользователя', async () => {
    const response = await AuthService.getUserNotAuth()
    expect(response.status).toBe(401)
    expect(response.data.code).toBe('1200')
    expect(response.data.message).toBe('User not authorized!')
  })
  //Только этот тест провален из-за data: await response.json() в формуле сервиса, надо условие написать, тот какое??
  it('удаление пользователя', async () => {
    const response = await AuthService.deleteUser()
    expect(response.status).toBe(204)
  })
  it('удаление удаленного пользователя', async () => {
    const response = await AuthService.deleteUser()
    expect(response.status).toBe(200)
    //const data = await response.json()
    expect(response.data.code).toBe('1207')
    expect(response.data.message).toBe('User Id not correct!')
  })
  it('удаление НЕ авторизованного пользователя', async () => {
    const response = await AuthService.deleteUserNotAuth()
    expect(response.status).toBe(401)
    expect(response.data.code).toBe('1200')
    expect(response.data.message).toBe('User not authorized!')
  })
})
