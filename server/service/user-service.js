const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserModel = mongoose.model('User')

const HASH_SALT = 15

const UserService = {
  getById: (id) => {
    return UserModel.findById(id)
  },

  getOneByField: (fieldName, fieldValue) => {
    return UserModel.findOne({ [fieldName]: fieldValue })
  },

  add: async ({ name, email, password, role }) => {
    const options = { upsert: true, new: true, setDefaultsOnInsert: true }
    const hashedPassword = await bcrypt.hash(password, HASH_SALT)

    const result = await UserModel.findOneAndUpdate(
      { email },
      { name, email, password: hashedPassword, role },
      options
    )
    return { ...result._doc }
  },
}

module.exports = UserService
