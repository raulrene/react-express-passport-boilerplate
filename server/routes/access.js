const ROLES = require('../../src/common/roles')

/** Access middleware to ensure user is allowed to access certain routes */
const AccessMiddleware = {
  hasAccess: (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.session.redirectTo = req.originalUrl
      return res.status(401).json({ success: false, error: 'unauthorized' })
    }

    next()
  },

  hasAdminAccess: (req, res, next) => {
    if (!req.isAuthenticated() || req.user.role !== ROLES.ADMIN) {
      req.session.redirectTo = req.originalUrl
      return res.status(401).json({ success: false, error: 'unauthorized' })
    }

    next()
  },
}

module.exports = AccessMiddleware
