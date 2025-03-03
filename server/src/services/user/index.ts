import User from '../../models/User'
import { decrypt, encrypt } from './encryptPassword'
import { tokenService } from '../token'
import { CustomError } from '@src/utils/error'
import { STATUS_CODE } from '@src/constants'

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
    if (!user)
      throw new CustomError({
        message: 'User not found!',
        statusCode: STATUS_CODE.BAD_REQUEST
      })

    return { user }
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
    if (!user)
      throw new CustomError({
        message: 'User not found!',
        statusCode: STATUS_CODE.BAD_REQUEST
      })

    return { user }
  },

  login: async ({ email, password, socialLogin }: ILogin) => {
    const user = await User.findOne({ email }).select('name email password')
    if (socialLogin && !user) return { success: false }

    if (!user)
      throw new CustomError({
        message: 'User not found!',
        statusCode: STATUS_CODE.BAD_REQUEST
      })

    if (!socialLogin) {
      await decrypt({
        password: password as string,
        comparePassword: user.password as string
      })
    }

    delete user?.password

    const userTokens = await tokenService.createUserToken({
      _id: user._id.toString(),
      content: user
    })

    return { userTokens: { tokens: userTokens.tokens } }
  },

  register: async ({
    data
  }: {
    data: { name: string; email: string; password: string }
  }) => {
    if (!data.name || !data.email || data.password.length < 8)
      throw new CustomError({
        message: 'Data is missing',
        statusCode: STATUS_CODE.BAD_REQUEST
      })

    const { encryptedUserPassword } = encrypt({
      password: data.password
    })
    const newData = {
      name: data.name,
      email: data.email,
      password: encryptedUserPassword
    }

    const user = await User.create(newData)
    if (!user)
      throw new CustomError({
        message: 'Error during user registration!',
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR
      })

    return { email: user.email }
  },

  deleteAccount: async ({ _id }: { _id: string }) => {
    const user = await User.deleteOne({ _id })

    if (user.deletedCount === 0)
      throw new CustomError({
        message: 'User not found',
        statusCode: STATUS_CODE.BAD_REQUEST
      })
  }
}
