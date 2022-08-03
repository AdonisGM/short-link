const mongoose = require('mongoose')

const {Schema} = mongoose

const LinkSchema = new Schema({
  name: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 200,
    required: true,
  },
  shortLink: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 200,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
  },
  isCustomShortLink: {
    type: Boolean,
    default: false,
  },
  originalLink: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 1500,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 200,
  },
  description: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 1500,
  },
}, {timestamps: true})

module.exports = mongoose.model('link', LinkSchema)
