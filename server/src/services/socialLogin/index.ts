import { randomPasswordGenerator } from '../../utils/helpers/randomPasswordGenerator'
import { userService } from '../user'

interface ISocialLogin {
  email: string
  name: string
}

const socialLoginService = {
  login: async ({ email, name }: ISocialLogin) => {
    const userLogin = await userService.socialLogin({
      email,
      socialLogin: true
    })
    if (!userLogin.success) {
      const newPassword = randomPasswordGenerator()
      const userRegister = await userService.register({
        data: {
          email,
          name,
          password: newPassword
        }
      })

      const userAlreadyRegisteredLogin = await userService.login({
        email: userRegister.email,
        password: newPassword
      })

      return {
        userTokens: userAlreadyRegisteredLogin.userTokens
      }
    }

    return { userTokens: userLogin.userTokens }
  }
}

export { socialLoginService }
