import User from '../../models/user/User'
import { decrypt, encrypt } from './encryptPassword'
import { tokenService } from '../token'

export const userService = {
  userPersonalInfos: async ({ _id }: { _id: string }) => {
    try {
      const user = await User.findOne({ _id }).select('-password')
      if (!user) throw new Error('User not found!')

      return { user, success: true }
    } catch (error) {
      console.error('Error when trying to get user personal infos:', error)
      return { error, success: false }
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
    } catch (error) {
      console.error('Error in update user infos:', error)
      return { error, success: false }
    }
  },

  login: async ({ email, password }: { email: string; password: string }) => {
    try {
      const user = await User.findOne({ email })
      if (!user) throw new Error('User not found!')

      const { success } = await decrypt({
        password,
        comparePassword: user.password as string
      })
      if (!success) throw new Error('Email or password incorrect!')

      delete user.password
      const userTokens = await tokenService.createUserToken({
        _id: user._id.toString(),
        content: user
      })

      if (!userTokens.success) throw new Error(userTokens.error as string)

      return { userTokens, success: true }
    } catch (error) {
      console.error('Error in login:', error)
      return { error, success: false }
    }
  },

  register: async ({ data }: { data: any }) => {
    try {
      const { success, encryptedUserPassword } = encrypt({
        password: data.password
      })

      if (!success) throw new Error('Error in encrypting password!')

      data.password = encryptedUserPassword
      const user = await User.create(data)

      if (!user) throw new Error('User not found!')

      return { success: true }
    } catch (error) {
      console.error('Error in registering user:', error)
      return { error, success: false }
    }
  },

  deleteAccount: async ({ _id }: { _id: string }) => {
    try {
      await User.deleteOne({ _id })

      return { success: true }
    } catch (error) {
      console.error('Error in deleting user account:', error)
      return { error, success: false }
    }
  }
}
