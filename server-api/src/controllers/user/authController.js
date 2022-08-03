const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const errorHandle = require('../../configs/errorHandle')
const User = require('../../models/user')
const RefreshToken = require('../../models/refreshToken')
const validator = require('validator')

const AuthController = {
  getToken: async (req, res, next) => {
    if (!req.body) {
      const error = errorHandle['validation-error-00001'](req)
      return res.status(error.status).json(error)
    }

    const {email, password} = req.body

    if (!email || !password) {
      const keys = []
      if (!email) keys.push('email')
      if (!password) keys.push('password')

      const error = errorHandle['validation-error-00002'](req, keys)
      return res.status(error.status).json(error)
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      const keys = []
      if (typeof email !== 'string') keys.push('email')
      if (typeof password !== 'string') keys.push('password')

      const error = errorHandle['validation-error-00003'](req, keys)
      return res.status(error.status).json(error)
    }

    const user = await User.findOne({email: email})
    if (!user) {
      const error = errorHandle['mongoose-error-00002'](req)
      return res.status(error.status).json(error)
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      const error = errorHandle['mongoose-error-00002'](req)
      return res.status(error.status).json(error)
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      accountType: user.accountType,
    }

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '10m'}, null)
    const refreshToken = jwt.sign(payload, process.env.JWT_R_SECRET, {expiresIn: '1y'}, null)

    const refreshTokenDoc = new RefreshToken({
      userId: user._id,
      refreshToken: refreshToken,
    })

    try {
      await refreshTokenDoc.save()
    } catch (e) {
      const error = errorHandle['mongoose-error-00003']
      return res.status(error.status).json(error)
    }

    return res.status(200).json({
      message: 'Successfully get token. Please keep the refresh token in your browser for future use.',
      data: {
        accessToken,
        refreshToken,
      },
    })
  },
  refreshToken: async (req, res, next) => {
    if (!req.body) {
      const error = errorHandle['validation-error-00001'](req)
      return res.status(error.status).json(error)
    }

    const {refreshToken} = req.body

    if (!refreshToken) {
      const error = errorHandle['validation-error-00002'](req, ['refreshToken'])
      return res.status(error.status).json(error)
    }

    if (typeof refreshToken !== 'string') {
      const error = errorHandle['validation-error-00003'](req, ['refreshToken'])
      return res.status(error.status).json(error)
    }

    if (!validator.isJWT(refreshToken)) {
      const error = errorHandle['jwt-error-00001'](req)
      return res.status(error.status).json(error)
    }

    const refreshTokenDoc = await RefreshToken.findOne({refreshToken: refreshToken})
    if (!refreshTokenDoc) {
      const error = errorHandle['jwt-error-00001'](req)
      return res.status(error.status).json(error)
    }

    let payload
    try {
      payload = jwt.verify(refreshToken, process.env.JWT_R_SECRET, null, null)
    } catch (e) {
      const error = errorHandle['jwt-error-00001'](req)
      return res.status(error.status).json(error)
    }

    const user = await User.findOne({_id: payload.id})
    if (!user) {
      const error = errorHandle['jwt-error-00001'](req)
      return res.status(error.status).json(error)
    }

    payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      accountType: user.accountType,
    }
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '10m'}, null)

    return res.status(200).json({
      message: 'Successfully refresh token.',
      data: {
        accessToken,
      }
    })
  },
}

module.exports = AuthController
