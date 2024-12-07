import User from '../../../models/User'
import { securityCodeGenerator } from '../../../utils/helpers/securityCodeGenerator'
import { tokenService } from '../../token'
import { encrypt } from '../encryptPassword'
import { EmailService } from '../../email'
import mongoose from 'mongoose'

export const recoverPassword = {
  checkEmailService: async ({ email }: { email: string }) => {
    const user = await User.findOne({ email })

    if (!user) return { error: 'Email not found', success: false }

    const securityCode = securityCodeGenerator()

    const { success, emailToken, error } = tokenService.createEmailToken({
      _id: user._id.toString(),
      content: securityCode
    })

    if (!success)
      return { error: `Error in create email token: ${error}`, success: false }

    const emailService = await EmailService.recoverPassword({
      recipientEmail: user.email,
      recipientName: user.name,
      securityCode
    })

    if (!emailService.success)
      return {
        error: emailService.error || 'Error trying to send email to user',
        success: false
      }

    return { success, emailToken, securityCode }
  },

  checkCodeService: async ({
    tokenCode,
    securityCode,
    userId
  }: {
    tokenCode: string
    securityCode: string
    userId: string
  }) => {
    if (securityCode === tokenCode) {
      const { success, emailToken, error } = tokenService.createEmailToken({
        _id: userId
      })

      if (!success)
        return {
          error: `Error in create email token: ${error}`,
          success: false
        }

      return { success, emailToken }
    }

    return { error: 'Secret code is wrong', success: false }
  },

  newPassword: async ({ password, _id }: { password: string; _id: string }) => {
    const newPassword = encrypt({ password })

    const user = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(_id) },
      { $set: { password: newPassword.encryptedUserPassword } }
    )

    if (!user) return { error: 'Error in create new password', success: false }

    return { success: true }
  }
}
