import supertest from 'supertest'
import config from '../config/configBookstore'
import { books } from '../../framework/fixtures/Books.json'
const [book1, book2] = books
const isbn = book1.isbn
const isbnBad = 123

const getBooks = async () => {
  const response = await supertest(config.baseURL).get('/BookStore/v1/Books')
  return {
    headers: response.headers,
    status: response.status,
    data: response.body
  }
}
const removeBooks = async () => {
  const response = await supertest(config.baseURL).delete('/BookStore/v1/Books')
  return {
    headers: response.headers,
    status: response.status,
    data: response.body
  }
}
const addBook = async () => {
  const response = await supertest(config.baseURL).post('/BookStore/v1/Books')
  return {
    headers: response.headers,
    status: response.status,
    data: response.body
  }
}
const replaceBook = async () => {
  const response = await supertest(config.baseURL).put('/BookStore/v1/Books/(isbn)')
  return {
    headers: response.headers,
    status: response.status,
    data: response.body
  }
}

const getBook = async () => {
  const response = await supertest(config.baseURL).get(`/BookStore/v1/Book?ISBN=${isbn}`)
  //const response = await supertest(config.baseURL).get(`/BookStore/v1/Book?ISBN=9781449325862`)
  return {
    headers: response.headers,
    status: response.status,
    data: response.body
  }
}
const getBadBook = async () => {
  const response = await supertest(config.baseURL).get(`/BookStore/v1/Book?ISBN=${isbnBad}`)
  //const response = await supertest(config.baseURL).get(`/BookStore/v1/Book?ISBN=9781449325862`)
  return {
    headers: response.headers,
    status: response.status,
    data: response.body
  }
}

export default {
  getAll: getBooks,
  removeAll: removeBooks,
  addList: addBook,
  replace: replaceBook,
  getOne: getBook,
  getBadBook
}
