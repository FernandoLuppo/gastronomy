import User from '../../models/User'
import { decrypt, encrypt } from './encryptPassword'
import { tokenService } from '../token'

interface ILogin {
  email: string
  password?: string
  socialLogin?: boolean
}

interface IUpdatePersonalInfos {
  name?: string
  email?: string
  password?: string
}

export const userService = {
  userPersonalInfos: async ({ _id }: { _id: string }) => {
    const user = await User.findOne({ _id }).select('-password')
    if (!user) return { error: 'User not found!', success: false }

    return { user, success: true }
  },

  updatePersonalInfos: async ({
    data,
    _id
  }: {
    data: IUpdatePersonalInfos
    _id: string
  }) => {
    if (data.password) {
      const { encryptedUserPassword } = encrypt({ password: data.password })
      data.password = encryptedUserPassword
    }

    const newData = {
      ...(data.name && { name: data.name }),
      ...(data.email && { email: data.email }),
      ...(data.password && { password: data.password })
    }

    const user = await User.findOneAndUpdate(
      { _id },
      {
        $set: newData
      },
      { new: true }
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

    return { userTokens: { tokens: userTokens.tokens }, success: true }
  },

  register: async ({
    data
  }: {
    data: { name: string; email: string; password: string }
  }) => {
    if (!data.name || !data.email || data.password.length < 8)
      return { error: 'Data is missing', success: false }

    const { encryptedUserPassword } = encrypt({
      password: data.password
    })
    const newData = {
      name: data.name,
      email: data.email,
      password: encryptedUserPassword
    }

    const user = await User.create(newData)
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
