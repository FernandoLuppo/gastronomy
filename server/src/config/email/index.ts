import { STATUS_CODE } from '@src/constants'
import { CustomError } from '@src/utils/error'
import nodemailer from 'nodemailer'

const emailConfig = () => {
  const { EMAIL_ADMIN, EMAIL_PASSWORD } = process.env

  if (!EMAIL_ADMIN || !EMAIL_PASSWORD)
    throw new CustomError({
      message: 'Email credentials are missing',
      statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR
    })

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    secure: true,
    auth: {
      user: EMAIL_ADMIN,
      pass: EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  })
  return { transporter }
}

export { emailConfig }
