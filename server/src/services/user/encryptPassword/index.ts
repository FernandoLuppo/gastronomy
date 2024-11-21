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
  console.log({ password })
  console.log({ comparePassword })
  const matchPasswords = await bcryptjs.compare(password, comparePassword)
  console.log({ matchPasswords })

  if (!matchPasswords) return { error: "Password don't match!", success: false }

  return { success: true }
}
