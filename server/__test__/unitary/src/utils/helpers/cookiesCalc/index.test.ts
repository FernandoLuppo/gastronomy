import { expect } from '@jest/globals'
import { cookiesCalc } from '../../../../../../src/utils/helpers'

const daysTime = 86400000
const minuteTime = 60000

describe('cookiesCalc', () => {
  it('Should return a time of one day', () => {
    const result = cookiesCalc({ cookieMaxAge: '1', dataType: 'days' })

    expect(result).toBeDefined()
    expect(result).toEqual(daysTime)
  })

  it('Should return a time of one minute', () => {
    const result = cookiesCalc({ cookieMaxAge: '1', dataType: 'minutes' })

    expect(result).toBeDefined()
    expect(result).toEqual(minuteTime)
  })
})
