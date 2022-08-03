const errorHandle = require('../../configs/errorHandle')
const validator = require('validator')

const LinkController = {
  create: async (req, res, next) => {
    if (!req.body) {
      const error = errorHandle['validation-error-00001'](req)
      return res.status(error.status).json(error)
    }

    const [name, shortUrl, longUrl, password, description] = req.body
    if (!name || !longUrl) {
      const keys = []
      if (!name) keys.push('name')
      if (!longUrl) keys.push('longUrl')

      const error = errorHandle['validation-error-00002'](req, keys)
      return res.status(error.status).json(error)
    }

    if (typeof name !== 'string' || typeof longUrl !== 'string') {
      const keys = []
      if (typeof name !== 'string') keys.push('name')
      if (typeof longUrl !== 'string') keys.push('longUrl')

      const error = errorHandle['validation-error-00003'](req, keys)
      return res.status(error.status).json(error)
    }

    if (validator.isLength(name, {min: 1, max: 200}) === false) {
      const error = errorHandle['validation-error-00004'](req, 'name')
      return res.status(error.status).json(error)
    }

    if (validator.isURL(longUrl) === false) {
      const error = errorHandle['validation-error-00003'](req, ['longUrl'])
      return res.status(error.status).json(error)
    }



    if (shortUrl && typeof shortUrl !== 'string') {
      const error = errorHandle['validation-error-00003'](req, ['shortUrl'])
      return res.status(error.status).json(error)
    }

    if (password && typeof password !== 'string') {
      const error = errorHandle['validation-error-00003'](req, ['password'])
      return res.status(error.status).json(error)
    }

    if (description && typeof description !== 'string') {
      const error = errorHandle['validation-error-00003'](req, ['description'])
      return res.status(error.status).json(error)
    }
  },
}

module.exports = LinkController
