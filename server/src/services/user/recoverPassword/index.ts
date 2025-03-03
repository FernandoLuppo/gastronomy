import User from '../../../models/User'
import { securityCodeGenerator } from '../../../utils/helpers/securityCodeGenerator'
import { tokenService } from '../../token'
import { encrypt } from '../encryptPassword'
import { EmailService } from '../../email'
import mongoose from 'mongoose'
import { CustomError } from '@src/utils/error'
import { STATUS_CODE } from '@src/constants'

export const recoverPassword = {
  checkEmailService: async ({ email }: { email: string }) => {
    const user = await User.findOne({ email })

    if (!user)
      throw new CustomError({
        message: 'Email not found',
        statusCode: STATUS_CODE.NOT_FOUND
      })

    const securityCode = securityCodeGenerator()

    const { emailToken } = tokenService.createEmailToken({
      _id: user._id.toString(),
      content: securityCode
    })

    await EmailService.recoverPassword({
      recipientEmail: user.email,
      recipientName: user.name,
      securityCode
    })

    return { emailToken, securityCode }
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
      const { emailToken } = tokenService.createEmailToken({
        _id: userId
      })
      return { emailToken }
    }

    throw new CustomError({
      message: 'Secret code is wrong',
      statusCode: STATUS_CODE.UNAUTHORIZED
    })
  },

  newPassword: async ({ password, _id }: { password: string; _id: string }) => {
    const newPassword = encrypt({ password })

    const user = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(_id) },
      { $set: { password: newPassword.encryptedUserPassword } }
    )

    if (!user)
      throw new CustomError({
        message: 'Error in create new password',
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR
      })
  }
}
