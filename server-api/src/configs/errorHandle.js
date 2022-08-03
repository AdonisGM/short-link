const errorHandle = {
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
}

module.exports = errorHandle
