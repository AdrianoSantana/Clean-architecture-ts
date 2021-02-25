import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-field-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'field_to_compare')
}

describe('Compare fields validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      field_to_compare: 'wrong_value'
    })
    expect(error).toEqual(new InvalidParamError('field_to_compare'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      field_to_compare: 'any_value'
    })
    expect(error).toBeFalsy()
  })
})
