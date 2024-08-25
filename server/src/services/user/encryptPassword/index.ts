import { Request } from 'express'
import bcryptjs from 'bcrypt'

export const encrypt = ({ password }: { password: string }) => {
  try {
    const encryption = bcryptjs.genSaltSync(10)
    const encryptedUserPassword = bcryptjs.hashSync(password, encryption)

    return { encryptedUserPassword, success: true }
  } catch (error) {
    console.log(error)
    return { error, success: false }
  }
}

export const decrypt = async ({
  password,
  comparePassword
}: {
  password: string
  comparePassword: string
}) => {
  try {
    const matchPasswords = await bcryptjs.compare(password, comparePassword)

    if (!matchPasswords) throw new Error("Password don't match!")

    return { success: true }
  } catch (error) {
    console.log(error)
    return { error, success: false }
  }
}
