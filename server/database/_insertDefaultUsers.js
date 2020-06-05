const ROLES = require('../../src/common/roles')
const UserService = require('../service/user-service')

/** Insert some default users */
;(() => {
  // Regular user
  const regularUser = {
    email: 'user@test.com',
    password: 'password',
    role: ROLES.USER,
    name: 'User',
  }
  UserService.add(regularUser).then((result) => {
    console.log('Regular user:', regularUser.email)
  })

  // Admin
  const admin = {
    email: 'admin@test.com',
    password: 'password',
    role: ROLES.ADMIN,
    name: 'Admin',
  }
  UserService.add(admin).then((result) => {
    console.log('Admin user:', admin.email)
  })
})()
