import mongoose from 'mongoose'

const {Schema} = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 200,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 200,
    index: true,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  accountType: {
    type: String,
    enum: ['basic', 'vip', 'premium'],
    default: 'basic',
  },
  isActive: {
    type: Boolean,
    default: false,
  }
}, {timestamps: true})

module.exports = mongoose.model('user', userSchema)
