const errorHandle = {
  'authorization-error-00001': (req) => {
    return {
      type: 'MiddlewareAuthorizationError',
      status: 401,
      errorCode: 'authorization-error-00001',
      title: 'Authorization error',
      detail: 'User is not authorized to access this resource. Please login to continue.',
      instance: req.originalUrl,
    }
  },
  'jwt-error-00001': (req) => {
    return {
      type: 'JsonWebTokenError',
      status: 400,
      errorCode: 'jwt-error-00001',
      title: 'refresh token is invalid',
      detail: 'refresh token is invalid or expired, login again to get a new one',
      instance: req.originalUrl,
    }
  },
  'validation-error-00001': (req) => {
    return {
      type: 'ValidationError',
      status: 400,
      errorCode: 'validation-error-00001',
      title: 'Body is missing or invalid format',
      detail: 'Request must contain a body with a valid JSON format',
      instance: req.originalUrl,
    }
  },
  'validation-error-00002': (req, keys) => {
    return {
      type: 'ValidationError',
      status: 400,
      errorCode: 'validation-error-00002',
      title: keys.join(', ') + ' are required',
      detail: keys.join(', ') + ' are required to register a new user. Please provide a valid value for ' + keys.join(', ') + '.',
      instance: req.originalUrl,
    }
  },
  'validation-error-00003': (req, keys) => {
    return {
      type: 'ValidationError',
      status: 400,
      errorCode: 'validation-error-00003',
      title: keys.join(', ') + ' are invalid format',
      detail: keys.join(', ') + ' are invalid format to register a new user. Please provide a valid value for ' + keys.join(', ') + '.',
      instance: req.originalUrl,
    }
  },
  'mongoose-error-00001': (req) => {
    return {
      type: 'MongooseError',
      status: 400,
      errorCode: 'mongoose-error-00001',
      title: 'User already exists',
      detail: 'User already exists. Please provide a different value for email.',
      instance: req.originalUrl,
    }
  },
  'mongoose-error-00002': (req) => {
    return {
      type: 'MongooseError',
      status: 400,
      errorCode: 'mongoose-error-00002',
      title: 'User not found',
      detail: 'we can\'t find a user with the email and password you provided. Please provide a different value for email and password.',
      instance: req.originalUrl,
    }
  },
  'mongoose-error-00003': (req) => {
    return {
      type: 'MongooseError',
      status: 400,
      errorCode: 'mongoose-error-00003',
      title: 'Error add refresh token',
      detail: 'Error add refresh token',
      instance: req.originalUrl,
    }
  },
}

module.exports = errorHandle
