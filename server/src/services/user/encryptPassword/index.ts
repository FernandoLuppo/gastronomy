import bcryptjs from 'bcryptjs'
import { handleErrors } from '../../../utils'

export const encrypt = ({ password }: { password: string }) => {
  try {
    const encryption = bcryptjs.genSaltSync(10)
    const encryptedUserPassword = bcryptjs.hashSync(password, encryption)

    return { encryptedUserPassword, success: true }
  } catch (err) {
    const { error, success } = handleErrors({
      err,
      errorMessage: 'Error in encrypt function'
    })
    return { error, success }
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
  } catch (err) {
    const { error, success } = handleErrors({
      err,
      errorMessage: 'Error in decrypt function'
    })
    return { error, success }
  }
}
