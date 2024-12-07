import { recoverPasswordTemplate } from '../../../../../src/services/email/template/recoverPassword'
import { EmailService } from '../../../../../src/services/email'
import { emailConfig } from '../../../../../src/config/email'
import * as dotenv from 'dotenv'
dotenv.config()

const mockData = {
  recipientEmail: 'fernandoluppo2@gmail.com',
  recipientName: 'Fernando Test',
  securityCode: 'abc123'
}

jest.mock('../../../../../src/services/email/template/recoverPassword')
jest.mock('../../../../../src/config/email')

describe('EmailService', () => {
  describe('recoverPassword', () => {
    it('Should send the recover password email', async () => {
      const mockEmailConfig = emailConfig as jest.Mock
      mockEmailConfig.mockReturnValue({
        success: true,
        transporter: {
          sendMail: jest.fn()
        }
      })

      const mockRecoverPasswordTemplate = recoverPasswordTemplate as jest.Mock
      mockRecoverPasswordTemplate.mockReturnValue({
        template: {
          from: process.env.EMAIL_ADMIN,
          to: mockData.recipientEmail,
          subject: 'test',
          html: '<h1>Test</h1>'
        }
      })

      const result = await EmailService.recoverPassword({
        recipientEmail: mockData.recipientEmail,
        recipientName: mockData.recipientName,
        securityCode: mockData.securityCode
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
    })

    it('Should return an error in email config', async () => {
      const mockEmailConfig = emailConfig as jest.Mock
      mockEmailConfig.mockReturnValue({
        success: false,
        transporter: null
      })

      const result = await EmailService.recoverPassword({
        recipientEmail: mockData.recipientEmail,
        recipientName: mockData.recipientName,
        securityCode: mockData.securityCode
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty('error', 'Error in email configuration')
    })

    it('Should return an error in recover password template', async () => {
      const mockEmailConfig = emailConfig as jest.Mock
      mockEmailConfig.mockReturnValue({
        success: true,
        transporter: {
          sendMail: jest.fn()
        }
      })

      const mockRecoverPasswordTemplate = recoverPasswordTemplate as jest.Mock
      mockRecoverPasswordTemplate.mockReturnValue(null)

      const result = await EmailService.recoverPassword({
        recipientEmail: mockData.recipientEmail,
        recipientName: mockData.recipientName,
        securityCode: mockData.securityCode
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty('error', 'Error in email template')
    })
  })
})
