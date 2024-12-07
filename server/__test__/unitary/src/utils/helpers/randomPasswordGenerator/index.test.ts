import { randomPasswordGenerator } from '../../../../../../src/utils/helpers/randomPasswordGenerator'

describe('randomPasswordGenerator', () => {
  it('Should generate a random password', () => {
    const result = randomPasswordGenerator()

    expect(result).toBeDefined()
    expect(result.length).toEqual(8)
  })
})
