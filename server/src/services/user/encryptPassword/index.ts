import bcryptjs from 'bcryptjs'

import { STATUS_CODE } from '../../../constants'
import { CustomError } from '../../../utils/error'

export const encrypt = ({ password }: { password: string }) => {
  const encryption = bcryptjs.genSaltSync(10)
  const encryptedUserPassword = bcryptjs.hashSync(password, encryption)

  return { encryptedUserPassword }
}

export const decrypt = async ({
  password,
  comparePassword
}: {
  password: string
  comparePassword: string
}) => {
  const matchPasswords = await bcryptjs.compare(password, comparePassword)
  if (!matchPasswords)
    throw new CustomError({
      message: 'Password is wrong!',
      statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR
    })
}
