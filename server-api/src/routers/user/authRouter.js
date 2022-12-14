const express = require('express')
const router = express.Router()

const AuthController = require('../../controllers/user/authController')

router.post('/get-token', AuthController.getToken)
router.post('/refresh-token', AuthController.refreshToken)

module.exports = router
