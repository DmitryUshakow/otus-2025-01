import { AuthService, UserService, UserFixture } from '../../framework'
describe('Users', () => {
  let token
  let userId
  let newUser

  beforeAll(async () => {
    newUser = UserFixture.generateUserCredentials()
  })

  it('Авторизован ли пользователь?', async () => {
    const responseCreateUser = await UserService.create(newUser)
    userId = responseCreateUser.data.userID

    const { data: authorizedBeforeLogin } = await AuthService.authorized(newUser)

    const responseToken = await AuthService.generateToken(newUser)
    token = responseToken.data.token

    const { data: authorizedAfterLogin } = await AuthService.authorized(newUser)

    expect(authorizedBeforeLogin).toBe(false)
    expect(authorizedAfterLogin).toBe(true)
  })
  // Проверки получения юзера
  it('Получение НЕ авторизованного юзера', async () => {
    const response = await UserService.get({ userId }) // просто передаю без токена
    expect(response.status).toBe(401)
    expect(response.data.code).toBe('1200')
    expect(response.data.message).toBe('User not authorized!')
  })
  it('Получение авторизованного юзера', async () => {
    const response = await UserService.get({ userId, token })
    expect(response.status).toBe(200)
    expect(response.data.userId).toBe(`${userId}`)
    expect(response.data.username).not.toBeNull()
    expect(response.data.username).toHaveProperty
    //expect(response.data.username).toBe('dUshakov@gmail.com') //(`${newUser}`) //(`${UserFixture.userName}`) //(`${userName}`)
  })
  // Проверки удаления юзера
  it('Удаление НЕ авторизованного юзера', async () => {
    const response = await UserService.remove({ userId }) //тута просто не передаю токен
    expect(response.status).toBe(401)
    expect(response.data.code).toBe('1200')
    expect(response.data.message).toBe('User not authorized!')
  })
  it('Удаление юзера', async () => {
    const response = await UserService.remove({ userId, token }) // уже было написано)
    expect(response.status).toBe(204)
    expect(response.data).toBe('')
  })
  it('Удаление удаленного юзера', async () => {
    const response = await UserService.remove({ userId, token }) // главное запускать после проверки на удаление)
    expect(response.status).toBe(200)
    expect(response.data.code).toBe('1207')
    expect(response.data.message).toBe('User Id not correct!')
  })
})
