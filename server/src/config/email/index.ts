import nodemailer from 'nodemailer'

const emailConfig = () => {
  const { EMAIL_ADMIN, EMAIL_PASSWORD } = process.env

  if (!EMAIL_ADMIN || !EMAIL_PASSWORD)
    return { error: 'Email credentials are missing', success: false }

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
  return { transporter, success: true }
}

export { emailConfig }
