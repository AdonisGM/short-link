const express = require('express')
const router = express.Router()

const QuizletController = require('../../controllers/quizlet/quizletController')

router.get('/register', QuizletController.getIp)

module.exports = router
