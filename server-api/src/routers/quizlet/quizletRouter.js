const express = require('express')
const router = express.Router()

const QuizletController = require('../../controllers/quizlet/quizletController')

router.get('/register', QuizletController.getIp)
router.post('/upload', QuizletController.upload)
router.post('/download', QuizletController.download)

module.exports = router
