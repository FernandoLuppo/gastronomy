import { securityCodeGenerator } from '../../../../../../src/utils/helpers/securityCodeGenerator'

describe('securityCodeGenerator', () => {
  it('Should generate a security code', () => {
    const result = securityCodeGenerator()

    expect(result).toBeDefined()
    expect(result.length).toEqual(5)
  })
})
