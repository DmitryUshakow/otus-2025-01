import { faker } from '@faker-js/faker'

export function generateUserCredentials() {
  return {
    userName: faker.internet.email('dUshakov@gmail.com'),
    password: 'P@ssw0rd'
  }
}
