import Token from '../../../../../../src/models/Token'
import {
  createToken,
  saveToken,
  searchTokenSecretKey
} from '../../../../../../src/utils/domain'
import * as dotenv from 'dotenv'
dotenv.config()

const mockTokenInfos = {
  expiresIn: '5s',
  payload: {
    content: ''
  },
  secret: process.env.TEST_TOKEN as string,
  sub: 'testToken'
}

const mockRefreshToken = {
  refreshToken: 'test',
  expireDat: new Date('2024-12-05T12:00:00.000Z'),
  userToken: '64c3f9c8e6f3c7c9c0cabc12'
}

jest.mock('../../../../../../src/models/Token', () => ({
  findOneAndUpdate: jest.fn()
}))

describe('tokenUtils', () => {
  describe('createToken', () => {
    it('Should create a token', () => {
      const result = createToken({
        expiresIn: mockTokenInfos.expiresIn,
        payload: mockTokenInfos.payload,
        secret: mockTokenInfos.secret,
        sub: mockTokenInfos.sub
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
      expect(result).toHaveProperty('token')
      expect(result.token?.length).toBeGreaterThan(20)
    })

    it('Should return an error when try to create a token', () => {
      const result = createToken({
        expiresIn: mockTokenInfos.expiresIn,
        payload: mockTokenInfos.payload,
        secret: '',
        sub: mockTokenInfos.sub
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty('error', 'data to create token is missing')
    })
  })

  describe('saveToken', () => {
    it('Should save token', async () => {
      const mockFindOneAndUpdate = Token.findOneAndUpdate as jest.Mock
      mockFindOneAndUpdate.mockResolvedValue({
        refreshToken: 'test'
      })

      const result = await saveToken({
        _id: '64c3f9c8e6f3c7c9c0cabc12',
        refreshToken: mockRefreshToken
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
    })

    it('Should return an error when try to save a token', async () => {
      const mockFindOneAndUpdate = Token.findOneAndUpdate as jest.Mock
      mockFindOneAndUpdate.mockResolvedValue(null)

      const result = await saveToken({
        _id: '',
        refreshToken: mockRefreshToken
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty('error', 'Error saving token!')
    })
  })

  describe('searchTokenSecretKey', () => {
    it('Should return the accessToken secret key', () => {
      const result = searchTokenSecretKey({ secret: 'accessToken' })

      expect(result).toBeDefined()
      expect(result?.length).toBeGreaterThan(20)
    })

    it('Should return the refreshToken secret key', () => {
      const result = searchTokenSecretKey({ secret: 'refreshToken' })

      expect(result).toBeDefined()
      expect(result?.length).toBeGreaterThan(20)
    })

    it('Should return the emailToken secret key', () => {
      const result = searchTokenSecretKey({ secret: 'emailToken' })

      expect(result).toBeDefined()
      expect(result?.length).toBeGreaterThan(20)
    })
  })
})
