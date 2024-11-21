import { randomPasswordGenerator } from '../../utils'
import { userService } from '../user'

interface ISocialLogin {
  email: string
  name: string
}

const socialLoginService = {
  login: async ({ email, name }: ISocialLogin) => {
    const newPassword = randomPasswordGenerator()

    const userLogin = await userService.login({
      email,
      socialLogin: true
    })

    if (!userLogin.success) {
      const userRegister = await userService.register({
        data: {
          email,
          name,
          password: newPassword
        }
      })

      if (!userRegister.success || !userRegister.data)
        return { error: 'Unable to register user', success: false }

      const userAlreadyRegisteredLogin = await userService.login({
        email: userRegister.data.email,
        password: newPassword
      })

      if (!userAlreadyRegisteredLogin.success)
        return { error: 'Unable to make a login', success: false }

      return {
        success: true,
        userTokens: userAlreadyRegisteredLogin.userTokens
      }
    }

    return { success: userLogin.success, userTokens: userLogin.userTokens }
  }
}

export { socialLoginService }
