import passport from 'passport'
import GitHubStrategy from 'passport-github2'

const githubSocialLogin = () => {
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env
  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET)
    throw new Error('Google envs is missing')

  passport.use(
    new GitHubStrategy.Strategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/social-login/auth/github/callback',
        scope: ['user:email']
      },
      (
        accessToken: string,
        refreshToken: string,
        profile: unknown,
        done: (item: null, profile: unknown) => void
      ) => {
        // console.log({ profile })
        done(null, profile)
      }
    )
  )
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user: any, done) => done(null, user))
}

export { githubSocialLogin }
