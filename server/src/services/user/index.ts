import User from '../../models/user/User'
import { decrypt, encrypt } from './encryptPassword'
import { tokenService } from '../token'
import { handleErrors } from '../../utils'

interface ILogin {
  email: string
  password?: string
  socialLogin?: boolean
}

export const userService = {
  userPersonalInfos: async ({ _id }: { _id: string }) => {
    try {
      const user = await User.findOne({ _id }).select('-password')
      if (!user) throw new Error('User not found!')

      return { user, success: true }
    } catch (err) {
      const { error, success } = handleErrors({
        err,
        errorMessage: 'Error when trying to get user personal infos:'
      })
      return { error, success }
    }
  },

  updatePersonalInfos: async ({ data, _id }: { data: any; _id: string }) => {
    try {
      const newPassword = encrypt({ password: data.password })
      data.password = newPassword

      const user = await User.updateOne(
        { _id },
        {
          $set: data
        }
      ).select('-password')

      if (!user) throw new Error('User not found!')

      return { user, success: true }
    } catch (err) {
      const { error, success } = handleErrors({
        err,
        errorMessage: 'Error in update user infos:'
      })
      return { error, success }
    }
  },

  login: async ({ email, password, socialLogin }: ILogin) => {
    try {
      const user = await User.findOne({ email }).select('name email password')
      if (!user) throw new Error('User not found!')

      if (!socialLogin) {
        const { success } = await decrypt({
          password: password as string,
          comparePassword: user.password as string
        })
        if (!success) throw new Error('Email or password incorrect!')

        delete user.password
      }
      const userTokens = await tokenService.createUserToken({
        _id: user._id.toString(),
        content: user
      })

      if (!userTokens.success) throw new Error(userTokens.error as string)

      return { userTokens, success: true }
    } catch (err) {
      const { error, success } = handleErrors({
        err,
        errorMessage: 'Error in Login'
      })
      return { error, success }
    }
  },

  register: async ({
    data
  }: {
    data: { name: string; email: string; password: string }
  }) => {
    try {
      const { success, encryptedUserPassword } = encrypt({
        password: data.password
      })
      if (!success || !encryptedUserPassword)
        throw new Error('Error in encrypting password!')

      data.password = encryptedUserPassword
      const user = await User.create(data)

      if (!user) throw new Error('User not found!')
      const userData = {
        email: user.email,
        password: user.password
      }
      return { success: true, data: userData }
    } catch (err) {
      const { error, success } = handleErrors({
        err,
        errorMessage: 'Error in registering user:'
      })
      return { error, success }
    }
  },

  deleteAccount: async ({ _id }: { _id: string }) => {
    try {
      await User.deleteOne({ _id })

      return { success: true }
    } catch (err) {
      const { error, success } = handleErrors({
        err,
        errorMessage: 'Error in deleting user account:'
      })
      return { error, success }
    }
  }
}
