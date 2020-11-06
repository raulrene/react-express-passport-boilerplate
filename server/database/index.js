const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
const dbUrl = process.env.DB_URI

// Connect DB
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  retryWrites: false,
})

// Register Schema
require('./schema')

// Insert some default users
require('./_insertDefaultUsers')
