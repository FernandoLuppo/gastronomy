import { encrypt } from '../../../../../../src/services/user/encryptPassword'
import User from '../../../../../../src/models/User'
import { EmailService } from '../../../../../../src/services/email'
import { tokenService } from '../../../../../../src/services/token'
import { recoverPassword } from '../../../../../../src/services/user/recoverPassword'
import { securityCodeGenerator } from '../../../../../../src/utils/helpers/securityCodeGenerator'
import * as dotenv from 'dotenv'
dotenv.config()

jest.mock('../../../../../../src/models/user/User')
jest.mock('../../../../../../src/utils/helpers/securityCodeGenerator')
jest.mock('../../../../../../src/services/token')
jest.mock('../../../../../../src/services/email')
jest.mock('../../../../../../src/services/user/encryptPassword')

describe('recoverPassword', () => {
  describe('checkEmailService', () => {
    it('Should pass correctly from check email process and generate a token', async () => {
      const mockData = {
        email: 'test@gmail.com'
      }

      const mockFindOne = User.findOne as jest.Mock
      mockFindOne.mockReturnValue({
        _id: '64f147c6f2336f8adf9b1234',
        name: 'test',
        email: mockData.email
      })

      const mockSecurityCodeGenerator = securityCodeGenerator as jest.Mock
      mockSecurityCodeGenerator.mockReturnValue({
        securityCode: 'abc12'
      })

      const mockCreateEmailToken = tokenService.createEmailToken as jest.Mock
      mockCreateEmailToken.mockReturnValue({
        success: true,
        emailToken: 'mockEmailToken'
      })

      const mockRecoverPassword = EmailService.recoverPassword as jest.Mock
      mockRecoverPassword.mockReturnValue({
        success: true
      })

      const result = await recoverPassword.checkEmailService({
        email: mockData.email
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
      expect(result).toHaveProperty('emailToken', 'mockEmailToken')
      expect(result).toHaveProperty('securityCode', { securityCode: 'abc12' })
    })

    it('Should return an error when trying to insert a non-existent email', async () => {
      const mockData = {
        email: 'test@gmail.com'
      }

      const mockFindOne = User.findOne as jest.Mock
      mockFindOne.mockReturnValue(null)

      const result = await recoverPassword.checkEmailService({
        email: mockData.email
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty('error', 'Email not found')
    })

    it('Should pass correctly from check email process and generate a token', async () => {
      const mockData = {
        email: 'test@gmail.com'
      }

      const mockFindOne = User.findOne as jest.Mock
      mockFindOne.mockReturnValue({
        _id: '64f147c6f2336f8adf9b1234',
        name: 'test',
        email: mockData.email
      })

      const mockSecurityCodeGenerator = securityCodeGenerator as jest.Mock
      mockSecurityCodeGenerator.mockReturnValue(null)

      const mockCreateEmailToken = tokenService.createEmailToken as jest.Mock
      mockCreateEmailToken.mockReturnValue({
        success: false
      })

      const result = await recoverPassword.checkEmailService({
        email: mockData.email
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty(
        'error',
        'Error in create email token: undefined'
      )
    })

    it('Should pass correctly from check email process and generate a token', async () => {
      const mockData = {
        email: 'test@gmail.com'
      }

      const mockFindOne = User.findOne as jest.Mock
      mockFindOne.mockReturnValue({
        _id: '64f147c6f2336f8adf9b1234',
        name: 'test',
        email: mockData.email
      })

      const mockSecurityCodeGenerator = securityCodeGenerator as jest.Mock
      mockSecurityCodeGenerator.mockReturnValue({
        securityCode: 'abc12'
      })

      const mockCreateEmailToken = tokenService.createEmailToken as jest.Mock
      mockCreateEmailToken.mockReturnValue({
        success: true,
        emailToken: 'mockEmailToken'
      })

      const mockRecoverPassword = EmailService.recoverPassword as jest.Mock
      mockRecoverPassword.mockReturnValue({
        success: false,
        error: ''
      })

      const result = await recoverPassword.checkEmailService({
        email: mockData.email
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty(
        'error',
        'Error trying to send email to user'
      )
    })
  })

  describe('checkCodeService', () => {
    it('Should check and return a new token', async () => {
      const mockData = {
        tokenCode: 'abc12',
        securityCode: 'abc12',
        userId: '64f147c6f2336f8adf9b1234'
      }

      const mockCreateEmailToken = tokenService.createEmailToken as jest.Mock
      mockCreateEmailToken.mockReturnValue({
        success: true,
        emailToken: 'mockEmailToken'
      })

      const result = await recoverPassword.checkCodeService({
        tokenCode: mockData.tokenCode,
        securityCode: mockData.securityCode,
        userId: mockData.userId
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
      expect(result).toHaveProperty('emailToken', 'mockEmailToken')
    })

    it('Should return an error because tokenCode and securityCode are different', async () => {
      const mockData = {
        tokenCode: 'abc12',
        securityCode: '123ab',
        userId: '64f147c6f2336f8adf9b1234'
      }

      const result = await recoverPassword.checkCodeService({
        tokenCode: mockData.tokenCode,
        securityCode: mockData.securityCode,
        userId: mockData.userId
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty('error', 'Secret code is wrong')
    })

    it('Should return an error when try to create the email token', async () => {
      const mockData = {
        tokenCode: 'abc12',
        securityCode: 'abc12',
        userId: '64f147c6f2336f8adf9b1234'
      }

      const mockCreateEmailToken = tokenService.createEmailToken as jest.Mock
      mockCreateEmailToken.mockReturnValue({
        success: false,
        error: 'test error'
      })

      const result = await recoverPassword.checkCodeService({
        tokenCode: mockData.tokenCode,
        securityCode: mockData.securityCode,
        userId: mockData.userId
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty(
        'error',
        'Error in create email token: test error'
      )
    })
  })

  describe('newPassword', () => {
    it('Should accept the new password', async () => {
      const mockData = {
        _id: '64f147c6f2336f8adf9b1234',
        password: 'testPassword'
      }

      const mockEncrypt = encrypt as jest.Mock
      mockEncrypt.mockReturnValue({
        encryptedUserPassword: 'testPasswordEncrypted'
      })

      const mockFindOneAndUpdate = User.findOneAndUpdate as jest.Mock
      mockFindOneAndUpdate.mockReturnValue({
        name: 'Test'
      })

      const result = await recoverPassword.newPassword({
        _id: mockData._id,
        password: mockData.password
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
    })
  })

  it('Should return an error when user is not found', async () => {
    const mockData = {
      _id: '64f147c6f2336f8adf9b1234',
      password: 'testPassword'
    }

    const mockEncrypt = encrypt as jest.Mock
    mockEncrypt.mockReturnValue({
      encryptedUserPassword: 'testPasswordEncrypted'
    })

    const mockFindOneAndUpdate = User.findOneAndUpdate as jest.Mock
    mockFindOneAndUpdate.mockReturnValue(null)

    const result = await recoverPassword.newPassword({
      _id: mockData._id,
      password: mockData.password
    })

    expect(result).toBeDefined()
    expect(result).toHaveProperty('success', false)
    expect(result).toHaveProperty('error', 'Error in create new password')
  })
})
