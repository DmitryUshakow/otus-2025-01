import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

// check of nameIsValid function
describe('nameIsValid function', () => {
  // Проверка строки на английском
  it('should return the correct response for string', () => {
    const result = nameIsValid('string')
    expect(result).toBe(true)
  })
  // Проверка строки на русском
  it('should return the correct response for строка', () => {
    const result = nameIsValid('строка')
    expect(result).toBe(false)
  })
  // Проверка числа
  it('should return the correct response for 2', () => {
    const result = nameIsValid(2)
    expect(result).toBe(false)
  })
  // Проверка boolean
  it('should return the correct response for true', () => {
    const result = nameIsValid(true)
    expect(result).toBe(false)
  })
  // Проверка массива
  it('should return the correct response for true', () => {
    const result = nameIsValid(['string', 'строка'])
    expect(result).toBe(false)
  })
})

// check of fullTrim function
describe('fullTrim function', () => {
  it('should return the correct response for Дед Мороз', () => {
    const result = fullTrim('Дед Мороз')
    expect(result).toBe('ДедМороз')
  })

  it('should return the correct response for Снегурочка', () => {
    const result = fullTrim('Снегурочка')
    expect(result).toBe('Снегурочка')
  })

  it('should return the correct response for  З а я ц ', () => {
    const result = fullTrim(' З а я ц ')
    expect(result).toBe('Заяц')
  })
})

// check of fullTrim function
describe('getTotal function', () => {
  // example 1
  it('should return the correct response for price: 10, quantity: 10', () => {
    const result = getTotal([{ price: 10, quantity: 10 }])
    expect(result).toBe(100)
  })
  // example 2
  it('should return the correct response for price: 10, quantity: 1', () => {
    const result = getTotal([{ price: 10, quantity: 1 }])
    expect(result).toBe(10)
  })
  // example 3
  it('should return the correct response for price: 10, quantity: 1 and price: 10, quantity: 9', () => {
    const result = getTotal([
      { price: 10, quantity: 1 },
      { price: 10, quantity: 9 }
    ])
    expect(result).toBe(100)
  })
  // example 4
  // ВАЖНО, как буд-то в задании небольшая ошибочка с закрывающей квадратной скобочкой массива)))
  it('should return the correct response for price: 10, quantity: 1', () => {
    const result = getTotal([
      { price: 10, quantity: 0 },
      { price: 10, quantity: 9 }
    ])
    expect(result).toBe(90)
  })
  // example 5
  it('should return the correct response for price: 10, quantity: 1 and price: 10, quantity: 9', () => {
    const result = getTotal([{ price: 10, quantity: 10 }], 10)
    expect(result).toBe(90)
  })
  // example 6
  // it('should return the correct response for price: 10, quantity: 1 and price: 10, quantity: 9', () => {
  //   const result = getTotal([{ price: 10, quantity: 10 }], 100) //как буд-то тута тоже ошибочка, скидка от 0 до 99, на это проверка ниже)
  //   expect(result).toBe(0)
  // })

  // Error 1 "Скидка должна быть числом"
  it('should return a default response for character', () => {
    expect(() => {
      getTotal([{ price: 10, quantity: 10 }], 'word')
    }).toThrow('Скидка должна быть числом')
  })
  // Error 2 "Процент скидки должен быть от 0 до 99"
  it('should return a default response for character', () => {
    expect(() => {
      getTotal([{ price: 10, quantity: 10 }], 100)
    }).toThrow('Процент скидки должен быть от 0 до 99')
  })
  it('should return a default response for character', () => {
    expect(() => {
      getTotal([{ price: 10, quantity: 10 }], -1)
    }).toThrow('Процент скидки должен быть от 0 до 99')
  })
})
