'use strict'

import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missingParamError'

describe('Signup Controller', () => {
  test('Deve retornar 400 se nenhum nome for enviado', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
})

describe('Signup Controller', () => {
  test('Deve retornar 400 se nenhum email for enviado', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})
