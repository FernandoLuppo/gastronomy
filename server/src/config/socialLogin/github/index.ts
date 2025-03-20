import { ISocialLoginDeserializeUser } from '@src/types'
import passport from 'passport'
import GitHubStrategy from 'passport-github2'

import { STATUS_CODE } from '../../../constants'
import { CustomError } from '../../../utils/error'

const githubSocialLogin = () => {
  const { GHUB_CLIENT_ID, GHUB_CLIENT_SECRET, API_URL } = process.env
  if (!GHUB_CLIENT_ID || !GHUB_CLIENT_SECRET)
    throw new CustomError({
      message: 'Github envs is missing',
      statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR
    })

  passport.use(
    new GitHubStrategy.Strategy(
      {
        clientID: GHUB_CLIENT_ID,
        clientSecret: GHUB_CLIENT_SECRET,
        callbackURL: `${API_URL}/social-login/auth/github/callback`,
        scope: ['user:email']
      },
      (
        accessToken: string,
        refreshToken: string,
        profile: unknown,
        done: (item: null, profile: unknown) => void
      ) => {
        done(null, profile)
      }
    )
  )
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user: ISocialLoginDeserializeUser, done) =>
    done(null, user)
  )
}

export { githubSocialLogin }
