import { LogErrorRepository } from '../../data/protocols/log-error-repository'
import { serverError } from '../../presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

interface sutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log (stackError: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new LogErrorRepositoryStub()
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          email: 'any@gmail.com',
          name: 'any',
          password: 'any',
          passwordConfirmation: 'any'
        }
      }
      return new Promise(resolve => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}

const makeSut = (): sutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('Log controller decorator', () => {
  test('Should call controller handle', async () => {
    const { controllerStub, sut } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = {
      body: {
        email: 'any@gmail.com',
        name: 'any',
        password: 'any',
        passwordConfirmation: 'any'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toBeCalledWith(httpRequest)
  })

  test('Should return the same result of the controller handle', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any@gmail.com',
        name: 'any',
        password: 'any',
        passwordConfirmation: 'any'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        email: 'any@gmail.com',
        name: 'any',
        password: 'any',
        passwordConfirmation: 'any'
      }
    })
  })

  test('Should call logErrorRepository with correct error if controller return a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(
      new Promise(
        resolve => resolve(error)
      )
    )
    const httpRequest = {
      body: {
        email: 'any@gmail.com',
        name: 'any',
        password: 'any',
        passwordConfirmation: 'any'
      }
    }
    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
