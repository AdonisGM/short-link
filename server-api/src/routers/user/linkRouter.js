const express = require('express')
const router = express.Router()

const LinkController = require('../../controllers/user/linkController')

router.post('/create', LinkController.create)

module.exports = router
