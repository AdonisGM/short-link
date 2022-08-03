const mongoose = require('mongoose')

const {Schema} = mongoose

const RefreshTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
}, {timestamps: true})

module.exports = mongoose.model('refreshToken', RefreshTokenSchema)
