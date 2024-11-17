import { Request } from 'express'
import User from '../../../models/user/User'
import { handleErrors, securityCodeGenerator } from '../../../utils'
import { tokenService } from '../../token'
import { encrypt } from '../encryptPassword'
import { EmailService } from '../../email'
import mongoose from 'mongoose'

export const recoverPassword = {
  checkEmailService: async ({ email }: { email: string }) => {
    try {
      const user = await User.findOne({ email })

      if (!user) throw new Error('Email not found')

      const securityCode = securityCodeGenerator()

      const { success, emailToken, error } = tokenService.createEmailToken({
        _id: user._id.toString(),
        content: securityCode
      })

      if (!success) throw new Error(`Error in create email token: ${error}`)

      const emailService = await EmailService.recoverPassword({
        recipientEmail: user.email,
        recipientName: user.name,
        securityCode
      })

      if (!emailService.success) throw new Error(emailService.error)

      return { success, emailToken, securityCode }
    } catch (err) {
      const { error, success } = handleErrors({
        err,
        errorMessage: 'Error in check email to recover password'
      })

      return { error, success }
    }
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
    try {
      console.log({ securityCode, tokenCode })

      if (securityCode === tokenCode) {
        const { success, emailToken, error } = tokenService.createEmailToken({
          _id: userId
        })

        if (!success) throw new Error(`Error in create email token: ${error}`)

        return { success, emailToken }
      }

      throw new Error('Secret code is wrong')
    } catch (err) {
      const { error, success } = handleErrors({
        err,
        errorMessage: 'Error in check code to recover password'
      })

      return { error, success }
    }
  },

  newPassword: async ({ password, _id }: { password: string; _id: string }) => {
    try {
      const newPassword = encrypt({ password })

      const user = await User.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(_id) },
        { $set: { password: newPassword.encryptedUserPassword } }
      )

      if (!user) throw new Error('Error in create new password')

      return { success: true }
    } catch (err) {
      const { error, success } = handleErrors({
        err,
        errorMessage: 'Error in create new password'
      })

      return { error, success }
    }
  }
}
