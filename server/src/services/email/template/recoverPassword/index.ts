import { template } from './template'

interface IRecoverPasswordTemplate {
  sender: string
  recipientEmail: string
  recipientName: string
  securityCode: string
}

export const recoverPasswordTemplate = ({
  recipientEmail,
  recipientName,
  securityCode,
  sender
}: IRecoverPasswordTemplate) => {
  const html = template(recipientName, securityCode)

  const emailTemplate = {
    from: sender,
    to: recipientEmail,
    subject: 'LuppoTW - Recover Password!',
    html
  }

  return emailTemplate
}
