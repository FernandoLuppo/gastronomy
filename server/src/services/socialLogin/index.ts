import { handleErrors } from '../../utils'
import { randomPasswordGenerator } from '../../utils'
import { userService } from '../user'

interface ISocialLogin {
  email: string
  name: string
}

const socialLoginService = {
  login: async ({ email, name }: ISocialLogin) => {
    try {
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
          throw new Error('Unable to register user')

        const userAlreadyRegisteredLogin = await userService.login({
          email: userRegister.data.email,
          password: userRegister.data.password as string
        })

        if (!userAlreadyRegisteredLogin.success)
          throw new Error('Unable to make a login')

        return {
          success: true,
          userTokens: userAlreadyRegisteredLogin.userTokens
        }
      }

      return { success: userLogin.success, userTokens: userLogin.userTokens }
    } catch (err) {
      const { error, success } = handleErrors({
        err,
        errorMessage: 'Error during Google social login'
      })
      return { error, success }
    }
  }
}

export { socialLoginService }
