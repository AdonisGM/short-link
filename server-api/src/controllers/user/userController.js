const errorHandle = require('../../configs/errorHandle')
const validator = require('validator')

const User = require('../../models/user')
const bcrypt = require('bcrypt')

const UserController = {
  register: async (req, res, next) => {
    if (!req.body) {
      const error = errorHandle['validation-error-00001'](req)
      return res.status(error.status).json(error)
    }

    const {name, email, password} = req.body

    if (!name || !email || !password) {
      const keys = []
      if (!name) keys.push('name')
      if (!email) keys.push('email')
      if (!password) keys.push('password')

      const error = errorHandle['validation-error-00002'](req, keys)
      return res.status(error.status).json(error)
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      const keys = []
      if (typeof name !== 'string') keys.push('name')
      if (typeof email !== 'string') keys.push('email')
      if (typeof password !== 'string') keys.push('password')

      const error = errorHandle['validation-error-00003'](req, keys)
      return res.status(error.status).json(error)
    }

    if (!validator.isLength(name.trim(), {min: 1, max: 200})) {
      const error = errorHandle['validation-error-00003'](req, ['name'])
      return res.status(error.status).json(error)
    }

    if (!validator.isEmail(email.trim())) {
      const error = errorHandle['validation-error-00003'](req, ['email'])
      return res.status(error.status).json(error)
    }

    if (!validator.isLength(password.trim(), {min: 8, max: 50})) {
      const error = errorHandle['validation-error-00003'](req, ['password'])
      return res.status(error.status).json(error)
    }

    const hashPassword = await bcrypt.hash(password, 15)

    const user = new User({
      name: name.trim(),
      email: email.trim(),
      password: hashPassword,
    })

    try {
      await user.save()
      return res.status(201).json({
        message: 'User created successfully',
      })
    } catch (e) {
      const error = errorHandle['mongoose-error-00001'](req)
      return res.status(error.status).json(error)
    }
  },
}

module.exports = UserController
