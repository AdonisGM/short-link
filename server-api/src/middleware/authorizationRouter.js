const jwt = require('jsonwebtoken')
const errorHandle = require('../configs/errorHandle')

const AuthorizationRouter = (req, res, next) => {
  if (!req.headers.authorization) {
    const error = errorHandle['authorization-error-00001'](req)
    return res.status(error.status).json(error)
  }

  const authorization = req.headers.authorization.split(' ')
  if (authorization.length !== 2) {
    const error = errorHandle['authorization-error-00001'](req)
    return res.status(error.status).json(error)
  }

  const [scheme, token] = authorization
  if (scheme !== 'Bearer') {
    const error = errorHandle['authorization-error-00001'](req)
    return res.status(error.status).json(error)
  }

  if (!token) {
    const error = errorHandle['authorization-error-00001'](req)
    return res.status(error.status).json(error)
  }

  let payload
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET, null, null)
  } catch (e) {
    const error = errorHandle['authorization-error-00001'](req)
    return res.status(error.status).json(error)
  }

  req.user = payload
  next()
}

module.exports = AuthorizationRouter;
