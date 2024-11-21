import User from '../../models/user/User'
import { decrypt, encrypt } from './encryptPassword'
import { tokenService } from '../token'

interface ILogin {
  email: string
  password?: string
  socialLogin?: boolean
}

export const userService = {
  userPersonalInfos: async ({ _id }: { _id: string }) => {
    const user = await User.findOne({ _id }).select('-password')
    if (!user) return { error: 'User not found!', success: false }

    return { user, success: true }
  },

  updatePersonalInfos: async ({ data, _id }: { data: any; _id: string }) => {
    const newPassword = encrypt({ password: data.password })
    data.password = newPassword

    const user = await User.updateOne(
      { _id },
      {
        $set: data
      }
    ).select('-password')

    if (!user) return { error: 'User not found!', success: false }

    return { user, success: true }
  },

  login: async ({ email, password, socialLogin }: ILogin) => {
    const user = await User.findOne({ email }).select('name email password')
    if (!user) return { error: 'User not found!', success: false }

    if (!socialLogin) {
      const { success } = await decrypt({
        password: password as string,
        comparePassword: user.password as string
      })
      if (!success)
        return { error: 'Email or password incorrect!', success: false }

      delete user.password
    }

    const userTokens = await tokenService.createUserToken({
      _id: user._id.toString(),
      content: user
    })
    if (!userTokens.success) return { error: userTokens.error, success: false }

    return { userTokens, success: true }
  },

  register: async ({
    data
  }: {
    data: { name: string; email: string; password: string }
  }) => {
    const { encryptedUserPassword } = encrypt({
      password: data.password
    })
    data.password = encryptedUserPassword

    const user = await User.create(data)
    if (!user) return { error: 'User not found!', success: false }

    const userData = {
      email: user.email,
      password: user.password
    }
    return { success: true, data: userData }
  },

  deleteAccount: async ({ _id }: { _id: string }) => {
    const user = await User.deleteOne({ _id })

    if (user.deletedCount === 0)
      return { error: 'User not found', success: false }

    return { success: true }
  }
}
