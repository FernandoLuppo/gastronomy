import { STATUS_CODE } from '../../../../../../src/constants'
import { tokenAuthentication } from '../../../../../../src/middlewares/authentications/tokenAuth'
import { tokenService } from '../../../../../../src/services/token'

jest.mock('../../../../../../src/services/token', () => ({
  tokenService: {
    extractTokenFromHeader: jest.fn(),
    validateToken: jest.fn(),
    createUserToken: jest.fn()
  }
}))

const mockReq = {
  headers: {
    authorization: 'Bearer tokenTest=test'
  },
  authenticatedUser: {
    token: {
      sub: 'mockSub',
      content: 'mockContent'
    }
  }
}

const mockData = {
  accessToken: 'mockAccessToken',
  accessTokenSecret: 'accessToken' as 'accessToken',
  refreshToken: 'mockRefreshToken',
  refreshTokenSecret: 'refreshToken' as 'refreshToken'
}

const req = mockReq as any
const res = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
  cookie: jest.fn().mockReturnThis()
} as any
const next = jest.fn()

describe('tokenAuthentication', () => {
  describe('privateRoutes', () => {
    it('Should pass only with access tokens validated', async () => {
      const mockTokenService = tokenService.extractTokenFromHeader as jest.Mock
      mockTokenService.mockReturnValue({
        accessToken: mockData.accessToken,
        refreshToken: mockData.refreshToken,
        success: true
      })

      const mockAccessTokenValidation = tokenService.validateToken as jest.Mock
      mockAccessTokenValidation.mockReturnValue({
        success: true,
        decodedToken: { content: 'mockContent' }
      })

      await tokenAuthentication.privateRoutes(req, res, next)

      expect(next).toHaveBeenCalled()
      expect(res.status).not.toHaveBeenCalled()
      expect(res.send).not.toHaveBeenCalled()
    })

    it('Access token should be refused but refresh needs to be valid', async () => {
      const mockTokenService = tokenService.extractTokenFromHeader as jest.Mock
      mockTokenService.mockReturnValue({
        accessToken: mockData.accessToken,
        refreshToken: mockData.refreshToken,
        success: true
      })

      const mockValidateToken = tokenService.validateToken as jest.Mock
      mockValidateToken.mockImplementation(({ secret }) => {
        if (secret === 'accessToken') {
          return { success: false, decodedToken: { content: 'mockContent' } }
        }
        if (secret === 'refreshToken') {
          return { success: true, decodedToken: { content: 'mockContent' } }
        }
        return { success: false }
      })

      const mockCreateUserToken = tokenService.createUserToken as jest.Mock
      mockCreateUserToken.mockReturnValue({
        success: true,
        tokens: {
          accessToken: mockData.accessToken,
          refreshToken: mockData.refreshToken
        }
      })

      await tokenAuthentication.privateRoutes(req, res, next)

      expect(res.cookie).toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
      expect(res.status).not.toHaveBeenCalled()
      expect(res.send).not.toHaveBeenCalled()
    })

    it('Should return an error in extract token from header', async () => {
      const mockTokenService = tokenService.extractTokenFromHeader as jest.Mock
      mockTokenService.mockReturnValue({
        success: false
      })

      await tokenAuthentication.privateRoutes(req, res, next)

      expect(next).not.toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(STATUS_CODE.UNAUTHORIZED)
      expect(res.send).toHaveBeenCalledWith({
        error: expect.anything(),
        success: false
      })
    })

    it('Should return an error in refresh token validate', async () => {
      const mockTokenService = tokenService.extractTokenFromHeader as jest.Mock
      mockTokenService.mockReturnValue({
        accessToken: mockData.accessToken,
        refreshToken: mockData.refreshToken,
        success: true
      })

      const mockValidateToken = tokenService.validateToken as jest.Mock
      mockValidateToken.mockImplementation(({ secret }) => {
        if (secret === 'accessToken') {
          return { success: false, decodedToken: { content: 'mockContent' } }
        }
        if (secret === 'refreshToken') {
          return { success: false, decodedToken: { content: 'mockContent' } }
        }
        return { success: false }
      })

      await tokenAuthentication.privateRoutes(req, res, next)

      expect(next).not.toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(STATUS_CODE.UNAUTHORIZED)
      expect(res.send).toHaveBeenCalledWith({
        error: expect.anything(),
        success: false
      })
    })

    it('Should return an error in create user token', async () => {
      const mockTokenService = tokenService.extractTokenFromHeader as jest.Mock
      mockTokenService.mockReturnValue({
        accessToken: mockData.accessToken,
        refreshToken: mockData.refreshToken,
        success: true
      })

      const mockValidateToken = tokenService.validateToken as jest.Mock
      mockValidateToken.mockImplementation(({ secret }) => {
        if (secret === 'accessToken') {
          return { success: false, decodedToken: { content: 'mockContent' } }
        }
        if (secret === 'refreshToken') {
          return { success: true, decodedToken: { content: 'mockContent' } }
        }
        return { success: false }
      })

      const mockCreateUserToken = tokenService.createUserToken as jest.Mock
      mockCreateUserToken.mockReturnValue({ success: false })

      await tokenAuthentication.privateRoutes(req, res, next)

      expect(next).not.toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(STATUS_CODE.UNAUTHORIZED)
      expect(res.send).toHaveBeenCalledWith({
        error: expect.anything(),
        success: false
      })
    })
  })

  describe('recoverPasswordPrivateRoutes', () => {
    it('Should validate email token and proceed', async () => {
      const mockAccessTokenValidation = tokenService.validateToken as jest.Mock
      mockAccessTokenValidation.mockReturnValue({
        success: true,
        decodedToken: { content: 'mockContent' }
      })

      await tokenAuthentication.recoverPasswordPrivateRoutes(req, res, next)
      expect(next).toHaveBeenCalled()
      expect(res.status).not.toHaveBeenCalled()
      expect(res.send).not.toHaveBeenCalled()
    })

    it('Should return an error in email token validation', async () => {
      const mockAccessTokenValidation = tokenService.validateToken as jest.Mock
      mockAccessTokenValidation.mockReturnValue({
        success: false,
        error: 'Error in token Validation'
      })

      await tokenAuthentication.recoverPasswordPrivateRoutes(req, res, next)

      expect(next).not.toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(STATUS_CODE.UNAUTHORIZED)
      expect(res.send).toHaveBeenCalledWith({
        error: expect.anything(),
        success: false
      })
    })
  })
})
