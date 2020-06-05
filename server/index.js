require('dotenv').config()
const express = require('express')
const passport = require('passport')
const path = require('path')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const session = require('cookie-session')
const { COOKIE_NAME } = require('../src/common/config')

// Read env variables
const port = process.env.PORT || 3001
const secret = process.env.APP_SECRET
const env = process.env.NODE_ENV || 'development'
const isLocal = env === 'development'

// Export app in order to be imported in /routes
const app = (module.exports = express())

// Load DB Connection and Register Schema
require('./database')

/* Express setup */
app.use(compression())
app.use(express.static(path.join(__dirname, '../build')))
// Parse JSON bodies (as sent by API clients)
app.use(express.json())
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }))

/* Session Setup */
app.use(cookieParser()) // read cookies (needed for auth)
if (!isLocal) {
  app.set('trust proxy', 1)
}
app.use(
  session({
    httpOnly: false,
    name: COOKIE_NAME,
    keys: [secret],
    secure: !isLocal,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })
)

/* Session management with Passport */
app.use(passport.initialize())
app.use(passport.session())
require('./passport')(passport)

/* Routes */
// Other routes (e.g. APIs)
require('./routes')

// Default app route
app.get('/*', function (req, res) {
  // Force redirect to HTTPS because cookie is set to secure: true
  if (!isLocal && req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`)
  } else {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'))
  }
})

app.listen(port, () => console.log('Server started on port', port))
