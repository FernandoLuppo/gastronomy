import { emailConfig } from '../../config/email'
import { recoverPasswordTemplate } from './template/recoverPassword'

interface IRecoverPassword {
  recipientEmail: string
  recipientName: string
  securityCode: string
}

const EmailService = {
  recoverPassword: async ({
    securityCode,
    recipientEmail,
    recipientName
  }: IRecoverPassword) => {
    const { EMAIL_ADMIN } = process.env
    const { transporter, success } = emailConfig()

    if (!EMAIL_ADMIN)
      return { error: 'Email credentials are missing', success: false }
    if (!success || !transporter)
      return { error: 'Error in email configuration', success: false }

    const template = recoverPasswordTemplate({
      recipientEmail,
      recipientName,
      securityCode,
      sender: EMAIL_ADMIN
    })
    if (!template) return { success: false, error: 'Error in email template' }

    await transporter.sendMail(template)
    return { success: true }
  }
}

export { EmailService }
