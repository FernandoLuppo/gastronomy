import { Request } from 'express'
import User from '../../models/user/User'
import { EncryptPassword } from './encryptPassword/EncryptPassword'

export class UserService {
  public constructor(private readonly _req: Request) {}

  public async userPersonalInfos() {
    try {
      const { _id } = this._req.user
      const user = await User.findOne({ _id }).select('-password')
      if (!user) throw new Error('User not found!')

      return { user, success: true }
    } catch (error) {
      return { error, success: false }
    }
  }

  public async updatePersonalInfos() {
    try {
      const data = this._req.body
      const { _id } = this._req.user?.subject

      const user = await User.updateOne(
        { _id },
        {
          $set: data
        }
      ).select('-password')

      if (!user) throw new Error('User not found!')

      return { user, success: true }
    } catch (error) {
      return { error, success: false }
    }
  }

  public async login() {
    try {
      const { email, password } = this._req.body
      const encryptPassword = new EncryptPassword(password)

      const user = await User.findOne({ email })
      if (!user) throw new Error('User not found!')

      const { success } = await encryptPassword.decrypt(user.password as string)
      if (!success) throw new Error('Email or password incorrect!')

      delete user.password

      //  Create Token

      return { user, success: true }
    } catch (error) {
      return { error, success: false }
    }
  }

  public async register() {
    try {
      const data = this._req.body

      const encryptPassword = new EncryptPassword(data.password)
      const { success, encryptedUserPassword } = encryptPassword.encrypt()

      if (!success) throw new Error('Error in encrypt password!')

      data.password = encryptedUserPassword
      const user = await User.create(data)

      if (!user) throw new Error('User not found!')

      return { success: true }
    } catch (error) {
      return { error, success: false }
    }
  }

  public async deleteAccount() {
    try {
      const { _id } = this._req.query

      await User.deleteOne({ _id })

      return { message: 'User deleted with success.', success: true }
    } catch (error) {
      return { error, success: false }
    }
  }
}
