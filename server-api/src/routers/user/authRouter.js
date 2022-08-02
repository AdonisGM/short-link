const express = require('express')
const {models} = require('mongoose')
const router = express.Router()

const AuthController = require('../../controllers/user/authController')

router.post('/get-token', AuthController.getToken)

module.exports = router
