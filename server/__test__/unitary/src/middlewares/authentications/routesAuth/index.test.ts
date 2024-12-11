import { STATUS_CODE } from '../../../../../../src/constants/HTTP'
import { routesAuthentication } from '../../../../../../src/middlewares/authentications/routesAuth'

const body = {
  email: 'test@test.com',
  password: '123456Ab@',
  name: 'Test',
  confirmPassword: '123456Ab@',
  oldPassword: '123456Ab@',
  securityCode: 'abc12'
}

const req = { body } as any
const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any
const next = jest.fn()

describe('routesAuthentication', () => {
  describe('register', () => {
    it('Should pass in middleware validation', async () => {
      await routesAuthentication.register(req, res, next)
      expect(next).toHaveBeenCalled()
      expect(res.status).not.toHaveBeenCalled()
      expect(res.send).not.toHaveBeenCalled()
    })

    it('should return an error in validation', async () => {
      const mockReqError = {
        body: null
      } as any

      await routesAuthentication.register(mockReqError, res, next)
      expect(next).not.toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(STATUS_CODE.UNAUTHORIZED)
      expect(res.send).toHaveBeenCalledWith({
        error: expect.anything(),
        success: false
      })
    })
  })

  describe('login', () => {
    it('Should pass in middleware validation', async () => {
      await routesAuthentication.login(req, res, next)
      expect(next).toHaveBeenCalled()
      expect(res.status).not.toHaveBeenCalled()
      expect(res.send).not.toHaveBeenCalled()
    })

    it('should return an error in validation', async () => {
      const mockReqError = {
        body: null
      } as any

      await routesAuthentication.login(mockReqError, res, next)
      expect(next).not.toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(STATUS_CODE.UNAUTHORIZED)
      expect(res.send).toHaveBeenCalledWith({
        error: expect.anything(),
        success: false
      })
    })
  })

  describe('updateUserInfos', () => {
    it('Should pass in middleware validation', async () => {
      await routesAuthentication.updateUserInfos(req, res, next)
      expect(next).toHaveBeenCalled()
      expect(res.status).not.toHaveBeenCalled()
      expect(res.send).not.toHaveBeenCalled()
    })

    it('should return an error in validation', async () => {
      const mockReqError = {
        body: null
      } as any

      await routesAuthentication.updateUserInfos(mockReqError, res, next)
      expect(next).not.toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(STATUS_CODE.UNAUTHORIZED)
      expect(res.send).toHaveBeenCalledWith({
        error: expect.anything(),
        success: false
      })
    })
  })

  describe('recoverPasswordCheckEmail', () => {
    it('Should pass in middleware validation', async () => {
      await routesAuthentication.recoverPasswordCheckEmail(req, res, next)
      expect(next).toHaveBeenCalled()
      expect(res.status).not.toHaveBeenCalled()
      expect(res.send).not.toHaveBeenCalled()
    })

    it('should return an error in validation', async () => {
      const mockReqError = {
        body: null
      } as any

      await routesAuthentication.recoverPasswordCheckEmail(
        mockReqError,
        res,
        next
      )
      expect(next).not.toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(STATUS_CODE.UNAUTHORIZED)
      expect(res.send).toHaveBeenCalledWith({
        error: expect.anything(),
        success: false
      })
    })
  })

  describe('recoverPasswordCheckCode', () => {
    it('Should pass in middleware validation', async () => {
      await routesAuthentication.recoverPasswordCheckCode(req, res, next)
      expect(next).toHaveBeenCalled()
      expect(res.status).not.toHaveBeenCalled()
      expect(res.send).not.toHaveBeenCalled()
    })

    it('should return an error in validation', async () => {
      const mockReqError = {
        body: null
      } as any

      await routesAuthentication.recoverPasswordCheckCode(
        mockReqError,
        res,
        next
      )
      expect(next).not.toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(STATUS_CODE.UNAUTHORIZED)
      expect(res.send).toHaveBeenCalledWith({
        error: expect.anything(),
        success: false
      })
    })
  })

  describe('newPassword', () => {
    it('Should pass in middleware validation', async () => {
      await routesAuthentication.newPassword(req, res, next)
      expect(next).toHaveBeenCalled()
      expect(res.status).not.toHaveBeenCalled()
      expect(res.send).not.toHaveBeenCalled()
    })

    it('should return an error in validation', async () => {
      const mockReqError = {
        body: null
      } as any

      await routesAuthentication.newPassword(mockReqError, res, next)
      expect(next).not.toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(STATUS_CODE.UNAUTHORIZED)
      expect(res.send).toHaveBeenCalledWith({
        error: expect.anything(),
        success: false
      })
    })
  })
})
