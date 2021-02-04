import { EmailValidatorAdapter } from './email-validator'

describe('EmailValidator Adapter', () => {
  test('Deve retornar falso se email validator retorna falso', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@email.com')
    expect(isValid).toBe(false)
  })
})
