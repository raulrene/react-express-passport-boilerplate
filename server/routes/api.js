const express = require('express')
const passport = require('passport')
const AccessMiddleware = require('./access')

const router = express.Router()

const errorResponse = (res, error) => {
  res.status(400).json({ success: false, error })
}

router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Test API route working fine!' })
})

router.get('/authenticated-only', AccessMiddleware.hasAccess, (req, res) => {
  res.json({ success: true, message: 'You have auth access!' })
})

router.get('/admin-only', AccessMiddleware.hasAdminAccess, (req, res) => {
  res.json({ success: true, message: 'You have admin access!' })
})

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return errorResponse(res, 'Invalid credentials')
  }

  // Authenticate the user using the credentials provided
  passport.authenticate('local', { session: true }, function (err, user) {
    if (err) {
      return errorResponse(res, 'Invalid credentials')
    }

    // When using passport with callback, we have to manually call req.login to set the Cookie
    req.login(user, async () => {
      res.json({ success: true, user })
    })
  })(req, res, next)
})

module.exports = router
exports.errorResponse = errorResponse
