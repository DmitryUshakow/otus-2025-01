import config from '../../framework/config/configBookstore'
import { BookService, AuthService, UserService, UserBookService } from '../../framework'
import { books } from '../../framework/fixtures/Books.json'

describe('Books', () => {
  const userId = config.userId
  const [book1, book2] = books
  const isbn = book1.isbn
  const isbnBad = 123

  let token

  beforeAll(async () => {
    token = await AuthService.getTokenFromCache({
      userName: config.username,
      password: config.password
    })
  })
  //Проверки на получение книги
  it('Список книг', async () => {
    const response = await BookService.getAll()

    expect(response.status).toBe(200)
    expect(response.data).toEqual({ books })
  })
  //Проверки на удаление книги
  it('Удаление всех книг из коллекции пользователя', async () => {
    const responseRemoveAll = await UserBookService.removeAll({
      userId,
      token
    })
    expect(responseRemoveAll.status).toBe(204)

    const responseUser = await UserService.get({
      userId,
      token
    })
    expect(responseUser.data.books).toEqual([])
  })
  it('Удаление всех книг из коллекции НЕ авторизованного пользователя', async () => {
    const responseRemoveAll = await UserBookService.removeAll({
      userId
    })
    expect(responseRemoveAll.status).toBe(401)
    expect(responseRemoveAll.data.code).toBe('1200')
    expect(responseRemoveAll.data.message).toBe('User not authorized!')
  })
  // Проверки на добавление книги
  it('Добавление книги в коллекцию к пользователю', async () => {
    const responseAddListOfBooks = await UserBookService.addList({
      userId,
      isbns: [isbn],
      token
    })
    expect(responseAddListOfBooks.status).toBe(201)
    expect(responseAddListOfBooks.data).toEqual({ books: [{ isbn }] })
    const responseUser = await UserService.get({
      userId,
      token
    })
    expect(responseUser.data).toEqual({
      books: [book1],
      userId,
      username: config.username
    })
  })
  it('Добавление книги в коллекцию к НЕ авторизованному пользователю', async () => {
    const responseAddListOfBooks = await UserBookService.addList({
      userId,
      isbns: [isbn]
    })
    expect(responseAddListOfBooks.status).toBe(401)
    expect(responseAddListOfBooks.data.code).toBe('1200')
    expect(responseAddListOfBooks.data.message).toBe('User not authorized!')
  })
  it('Добавление НЕ существующей книги в коллекцию к авторизованному пользователю', async () => {
    const responseAddListOfBooks = await UserBookService.addList({
      userId,
      isbns: [''],
      token
    })
    expect(responseAddListOfBooks.status).toBe(400)
    expect(responseAddListOfBooks.data.code).toBe('1205')
    expect(responseAddListOfBooks.data.message).toBe('ISBN supplied is not available in Books Collection!')
  })
  it('Добавление книги в коллекцию к пользователю код 1207)', async () => {
    const responseAddListOfBooks = await UserBookService.addList({
      userId,
      isbns: [],
      token
    })
    expect(responseAddListOfBooks.status).toBe(400)
    expect(responseAddListOfBooks.data.code).toBe('1207')
  })
  //Проверки на получение информации о книге
  it('Получение инфо о книги', async () => {
    const response = await BookService.getOne({
      userId,
      isbn,
      token
    })
    expect(response.status).toBe(200)
  })
  it('Получение инфо о НЕ существующей книги', async () => {
    const response = await BookService.getBadBook({
      isbnBad
    })
    expect(response.status).toEqual(400)
    expect(response.data.code).toBe('1205')
    expect(response.data.message).toBe('ISBN supplied is not available in Books Collection!')
  })
  //Проверки на замену книги
  it('Заменить книгу на эту же в коллекции пользователя', async () => {
    const responseAddBook = await UserBookService.replace({
      userId,
      fromIsbn: isbn,
      toIsbn: book1.isbn,
      token
    })
    expect(responseAddBook.status).toEqual(400)
    expect(responseAddBook.data.code).toEqual('1206')
    expect(responseAddBook.data.message).toEqual(`ISBN supplied is not available in User's Collection!`)
  })
  it('Заменить книгу в коллекции пользователя', async () => {
    const responseAddBook = await UserBookService.replace({
      userId,
      fromIsbn: isbn,
      toIsbn: book2.isbn,
      token
    })
    expect(responseAddBook.data).toEqual({
      books: [book2],
      userId,
      username: config.username
    })
  })
  it('Заменить книгу в коллекции у НЕ авторизованного пользователя', async () => {
    const responseAddBook = await UserBookService.replace({
      userId,
      fromIsbn: isbn,
      toIsbn: book2.isbn
    })
    expect(responseAddBook.status).toEqual(401)
    expect(responseAddBook.data.code).toEqual('1200')
    expect(responseAddBook.data.message).toBe('User not authorized!')
  })
})
