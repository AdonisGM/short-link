const UserController = {
  register: (req, res, next) => {
    return res.status(200).json({
      message: 'User registered successfully',
    })
  }
}

module.exports = UserController
