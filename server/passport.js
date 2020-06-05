const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const UserService = require('./service/user-service')

module.exports = function (passport) {
  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user._id)
  })

  // used to deserialize the user
  passport.deserializeUser(async function (id, done) {
    await UserService.getById(id)
      .then((res) => {
        done(null, res)
      })
      .catch((err) => done(err, null))
  })

  passport.use(
    new LocalStrategy(
      {
        // Passport uses "username" and "password", so we override with the names that we want those fields to have
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },

      /**
       * This is the Auth handler. We check for a valid user phone and authenticate if found
       */
      async function (req, email, password, done) {
        const user = await UserService.getOneByField('email', email)

        // Check for valid user
        if (!user) {
          return done('Invalid credentials', false)
        }
        // Check for valid auth
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
          return done('Invalid credentials', false)
        }

        // All is well, return successful user
        return done(null, user)
      }
    )
  )
}
