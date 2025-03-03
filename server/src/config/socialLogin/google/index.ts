import { STATUS_CODE } from '@src/constants'
import { CustomError } from '@src/utils/error'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'

const googleSocialLoginConfig = () => {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env
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
        callbackURL: 'http://localhost:3000/social-login/auth/google/callback'
      },
      (accessToken, refreshToken, profile, done) => done(null, profile)
    )
  )
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user: any, done) => done(null, user))
}

export { googleSocialLoginConfig }
