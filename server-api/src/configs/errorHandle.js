const errorHandle = {
  'validation-error-00001': (req) => {
    return {
      type: 'ValidationError',
      status: 400,
      title: 'Body is missing or invalid format',
      detail: 'Request must contain a body with a valid JSON format',
      instance: req.originalUrl,
    }
  },
}
