import { ISocialLoginDeserializeUser } from '@src/types'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'

import { STATUS_CODE } from '../../../constants'
import { CustomError } from '../../../utils/error'

const googleSocialLoginConfig = () => {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, API_URL } = process.env
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET)
    throw new CustomError({
      message: 'Google envs is missing',
      statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR
    })

  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${API_URL}/social-login/auth/google/callback`
      },
      (accessToken, refreshToken, profile, done) => done(null, profile)
    )
  )
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user: ISocialLoginDeserializeUser, done) =>
    done(null, user)
  )
}

export { googleSocialLoginConfig }
