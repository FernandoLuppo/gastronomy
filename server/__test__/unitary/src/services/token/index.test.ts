import { tokenService } from '../../../../../src/services/token'
import * as dotenv from 'dotenv'
dotenv.config()

describe('tokenService', () => {
  describe('extractTokenFromHeader', () => {
    it('Should get token from header', () => {
      const authorization =
        'Bearer {"accessToken":"mockAccessToken","refreshToken":"mockRefreshToken"}'
      const result = tokenService.extractTokenFromHeader({
        authorization
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
      expect(result).toHaveProperty('accessToken', 'mockAccessToken')
      expect(result).toHaveProperty('refreshToken', 'mockRefreshToken')
    })

    it('Should return an error when try execute the function without authorization value', () => {
      const authorization = ''
      const result = tokenService.extractTokenFromHeader({
        authorization
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty('error', 'Authorization header is missing')
    })

    it('Should return an error when try to execute the function with an wrong authorization value', () => {
      const authorization = 'test'
      const result = tokenService.extractTokenFromHeader({
        authorization
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty('error', 'Invalid token format')
    })
  })
})
