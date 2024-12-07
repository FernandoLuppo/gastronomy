import bcryptjs from 'bcryptjs'

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
  if (!matchPasswords) return { error: "Password don't match!", success: false }

  return { success: true }
}
