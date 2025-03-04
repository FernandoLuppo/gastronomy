import { CustomError } from '../../utils/error'
import { emailConfig } from '../../config/email'
import { recoverPasswordTemplate } from './template/recoverPassword'
import { STATUS_CODE } from '../../constants'

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
    if (!EMAIL_ADMIN)
      throw new CustomError({
        message: 'Email credentials are missing',
        statusCode: STATUS_CODE.UNAUTHORIZED
      })

    const { transporter } = emailConfig()
    if (!transporter)
      throw new CustomError({
        message: 'Error in email configuration',
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR
      })

    const template = recoverPasswordTemplate({
      recipientEmail,
      recipientName,
      securityCode,
      sender: EMAIL_ADMIN
    })
    if (!template)
      throw new CustomError({
        message: 'Error in email template',
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR
      })

    await transporter.sendMail(template)
  }
}

export { EmailService }
