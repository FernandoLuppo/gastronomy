import { socialLoginService } from '../../../../../src/services/socialLogin'
import { userService } from '../../../../../src/services/user'
import { randomPasswordGenerator } from '../../../../../src/utils/helpers/randomPasswordGenerator'

jest.mock('../../../../../src/services/user', () => ({
  userService: {
    login: jest.fn(),
    register: jest.fn()
  }
}))
jest.mock('../../../../../src/utils/helpers/randomPasswordGenerator')

const mockData = {
  email: 'test@gmail.com',
  name: 'Test',
  token: 'testToken'
}

describe('socialLoginService', () => {
  describe('login', () => {
    it('Should make a social login', async () => {
      const mockRandomPasswordGenerator = randomPasswordGenerator as jest.Mock
      mockRandomPasswordGenerator.mockReturnValue('newPasswordTest')

      const mockUserLogin = userService.login as jest.Mock
      mockUserLogin.mockReturnValue({
        success: true,
        userTokens: mockData.token
      })

      const result = await socialLoginService.login({
        email: mockData.email,
        name: mockData.name
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
      expect(result).toHaveProperty('userTokens', mockData.token)
    })

    it('Should create an account in social login', async () => {
      const mockRandomPasswordGenerator = randomPasswordGenerator as jest.Mock
      mockRandomPasswordGenerator.mockReturnValue('newPasswordTest')

      const mockUserLogin = userService.login as jest.Mock
      mockUserLogin.mockReturnValue({
        success: false
      })

      const mockUserRegister = userService.register as jest.Mock
      mockUserRegister.mockReturnValue({
        success: true,
        data: {
          email: mockData.email
        }
      })

      const mockUserLoginAfterRegistration = userService.login as jest.Mock
      mockUserLoginAfterRegistration.mockReturnValue({
        success: true,
        userTokens: mockData.token
      })

      const result = await socialLoginService.login({
        email: mockData.email,
        name: mockData.name
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
      expect(result).toHaveProperty('userTokens', mockData.token)
    })

    it('Should return an error on register tentative in social login', async () => {
      const mockRandomPasswordGenerator = randomPasswordGenerator as jest.Mock
      mockRandomPasswordGenerator.mockReturnValue('newPasswordTest')

      const mockUserLogin = userService.login as jest.Mock
      mockUserLogin.mockReturnValue({
        success: false
      })

      const mockUserRegister = userService.register as jest.Mock
      mockUserRegister.mockReturnValue({
        success: false,
        data: null
      })

      const result = await socialLoginService.login({
        email: mockData.email,
        name: mockData.name
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty('error', 'Unable to register user')
    })

    it('Should return an error in login tentative after registration', async () => {
      const mockRandomPasswordGenerator = randomPasswordGenerator as jest.Mock
      mockRandomPasswordGenerator.mockReturnValue('newPasswordTest')

      const mockUserLogin = userService.login as jest.Mock
      mockUserLogin.mockReturnValue({
        success: false
      })

      const mockUserRegister = userService.register as jest.Mock
      mockUserRegister.mockReturnValue({
        success: true,
        data: {
          email: mockData.email
        }
      })

      const mockUserLoginAfterRegistration = userService.login as jest.Mock
      mockUserLoginAfterRegistration.mockReturnValue({ success: false })

      const result = await socialLoginService.login({
        email: mockData.email,
        name: mockData.name
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty('error', 'Unable to make a login')
    })
  })
})
