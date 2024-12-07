import { tokenService } from '../../../../../src/services/token'

import * as dotenv from 'dotenv'
dotenv.config()

const _id = '64c3f9c8e6f3c7c9c0cabc12'
const mockReq = {
  authenticatedUser: {
    tokens: {
      sub: '',
      content: ''
    }
  }
} as any

describe('tokenService', () => {
  describe('createUserToken', () => {
    it('Should create the access and refresh tokens', async () => {
      const result = await tokenService.createUserToken({
        _id,
        content: 'testContent'
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
      expect(result).toHaveProperty('tokens')
      expect(result.tokens).toHaveProperty('accessToken')
      expect(result.tokens).toHaveProperty('refreshToken')
    })

    it('Should return an error when try to create user tokens', async () => {
      const result = await tokenService.createUserToken({
        _id: '',
        content: 'testContent'
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty('error', '_id is missing!')
    })
  })

  describe('createEmailToken', () => {
    it('Should create email token', () => {
      const result = tokenService.createEmailToken({
        _id,
        content: 'testContent'
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
      expect(result).toHaveProperty('emailToken')
      expect(result.emailToken?.length).toBeGreaterThan(50)
    })

    it('Should return an error when try to create a token whit a wrong _id', () => {
      const result = tokenService.createEmailToken({
        _id: '',
        content: 'testContent'
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty('error', '_id is missing!')
    })
  })

  describe('validateToken', () => {
    it('Should validate the accessToken without errors', async () => {
      const tokens = await tokenService.createUserToken({
        _id,
        content: 'testContent'
      })

      const result = tokenService.validateToken({
        req: mockReq,
        secret: 'accessToken',
        token: tokens.tokens?.accessToken as string
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
      expect(result).toHaveProperty('decodedToken')
      expect(result.decodedToken).toHaveProperty('content', 'testContent')
      expect(result.decodedToken).toHaveProperty('role', 'accessToken')
    })

    it('Should validate the refreshToken without errors', async () => {
      const tokens = await tokenService.createUserToken({
        _id,
        content: 'testContent'
      })

      const result = tokenService.validateToken({
        req: mockReq,
        secret: 'refreshToken',
        token: tokens.tokens?.refreshToken as string
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
      expect(result).toHaveProperty('decodedToken')
      expect(result.decodedToken).toHaveProperty('content', 'testContent')
      expect(result.decodedToken).toHaveProperty('role', 'refreshToken')
    })

    it('Should validate the emailToken without errors', async () => {
      const tokens = tokenService.createEmailToken({
        _id,
        content: 'testContent'
      })

      const result = tokenService.validateToken({
        req: mockReq,
        secret: 'emailToken',
        token: tokens.emailToken as string
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
      expect(result).toHaveProperty('decodedToken')
      expect(result.decodedToken).toHaveProperty('content', 'testContent')
      expect(result.decodedToken).toHaveProperty('role', 'emailToken')
    })

    it('Should return an error in token validation', async () => {
      const result = tokenService.validateToken({
        req: mockReq,
        secret: 'emailToken',
        token: ''
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty('error', 'Token is missing')
    })
  })
})
