const AuthController = {
  getToken: async (req, res, next) => {
    return res.status(200).json({
      message: 'Token generated successfully',
    })
  },
}

module.exports = AuthController
