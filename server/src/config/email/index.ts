import nodemailer from 'nodemailer'

const emailConfig = () => {
  const { EMAIL_ADMIN, EMAIL_PASSWORD } = process.env
  console.log({ EMAIL_ADMIN })
  console.log({ EMAIL_PASSWORD })
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
  console.log({ transporter })
  return { transporter, success: true }
}

export { emailConfig }
