import {
  decrypt,
  encrypt
} from '../../../../../../src/services/user/encryptPassword'
import bcryptjs from 'bcryptjs'

jest.mock('bcryptjs', () => ({
  genSaltSync: jest.fn(),
  hashSync: jest.fn(),
  compare: jest.fn()
}))

const mockData = {
  password: 'mockPassword',
  comparePassword: 'mockPassword'
}

describe('encryptPassword', () => {
  describe('encrypt', () => {
    it('should encrypt a password', () => {
      const mockBcryptjs = bcryptjs.genSaltSync as jest.Mock
      mockBcryptjs.mockReturnValue('mockSalt')

      const mockHashSync = bcryptjs.hashSync as jest.Mock
      mockHashSync.mockReturnValue('mockHashedPassword')

      const result = encrypt({ password: mockData.password })

      expect(result).toBeDefined()
      expect(result).toHaveProperty(
        'encryptedUserPassword',
        'mockHashedPassword'
      )
    })
  })

  describe('decrypt', () => {
    it('Should compare the password and return success', async () => {
      const mockCompare = bcryptjs.compare as jest.Mock
      mockCompare.mockResolvedValue(true)

      const result = await decrypt({
        comparePassword: mockData.comparePassword,
        password: mockData.password
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
    })

    it('Should return an error when password do not match', async () => {
      const mockCompare = bcryptjs.compare as jest.Mock
      mockCompare.mockResolvedValue(false)

      const result = await decrypt({
        comparePassword: 'test',
        password: mockData.password
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty('error', "Password don't match!")
    })
  })
})
