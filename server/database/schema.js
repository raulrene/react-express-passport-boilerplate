const mongoose = require('mongoose')

// Define Schemas
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
})

// Register Models on Schema
mongoose.model('User', new mongoose.Schema(userSchema, { timestamps: true }))
