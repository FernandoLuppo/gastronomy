import { Request } from 'express'
import User from '../../models/user/User'
import { EncryptPassword } from './encryptPassword/EncryptPassword'
import { TokenService } from '../token/TokenService'

export class UserService {
  public constructor(private readonly _req: Request) {}

  public async userPersonalInfos() {
    try {
      const _id = this._req.user?.token.sub
      const user = await User.findOne({ _id }).select('-password')
      if (!user) throw new Error('User not found!')

      return { user, success: true }
    } catch (error) {
      console.error('Error when try to get user personal infos:', error)
      return { error, success: false }
    }
  }

  public async updatePersonalInfos() {
    try {
      const data = this._req.body
      const _id = this._req.user?.token.sub

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
  }

  public async login(
    tokenService: TokenService,
    encryptPassword: EncryptPassword
  ) {
    try {
      const { email } = this._req.body
      const user = await User.findOne({ email })
      if (!user) throw new Error('User not found!')

      const { success } = await encryptPassword.decrypt({
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
  }

  public async register(encryptPassword: EncryptPassword) {
    try {
      const data = this._req.body

      const { success, encryptedUserPassword } = encryptPassword.encrypt()

      if (!success) throw new Error('Error in encrypt password!')

      data.password = encryptedUserPassword
      const user = await User.create(data)

      if (!user) throw new Error('User not found!')

      return { success: true }
    } catch (error) {
      console.error('Error in register user:', error)
      return { error, success: false }
    }
  }

  public async deleteAccount() {
    try {
      const { _id } = this._req.query

      await User.deleteOne({ _id })

      return { message: 'User deleted with success.', success: true }
    } catch (error) {
      console.error('Error in delete user account:', error)
      return { error, success: false }
    }
  }
}
