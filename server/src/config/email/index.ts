import nodemailer from 'nodemailer'

const emailConfig = () => {
  const { EMAIL_ADMIN, EMAIL_PASSWORD } = process.env

  if (!EMAIL_ADMIN || !EMAIL_PASSWORD)
    throw new Error('Email credentials are missing')

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
