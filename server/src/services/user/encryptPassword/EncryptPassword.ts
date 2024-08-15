import { Request } from 'express'
import bcryptjs from 'bcrypt'

export class EncryptPassword {
  public constructor(private readonly _password: string) {}

  public encrypt() {
    try {
      const encryption = bcryptjs.genSaltSync(10)
      const encryptedUserPassword = bcryptjs.hashSync(
        this._password,
        encryption
      )

      return { encryptedUserPassword, success: true }
    } catch (error) {
      return { error, success: false }
    }
  }

  public async decrypt(comparePassword: string) {
    try {
      const matchPasswords = await bcryptjs.compare(
        this._password,
        comparePassword
      )

      if (!matchPasswords) throw new Error("Password don't match!")

      return { success: true }
    } catch (error) {
      return { error, success: false }
    }
  }
}
