import { Transporter } from 'nodemailer'
import { emailConfig } from '../../config/email'
import { handleErrors } from '../../utils'
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
    try {
      const { EMAIL_ADMIN } = process.env
      const { transporter } = emailConfig()

      if (!EMAIL_ADMIN) throw new Error('Email credentials are missing')
      if (!transporter) throw new Error('Error in email configuration')

      const template = recoverPasswordTemplate({
        recipientEmail,
        recipientName,
        securityCode,
        sender: EMAIL_ADMIN
      })

      await transporter.sendMail(template)

      return { success: true }
    } catch (err) {
      const { error, success } = handleErrors({
        err,
        errorMessage: 'Error in send email to user'
      })
      return { error, success }
    }
  }
}

export { EmailService }
