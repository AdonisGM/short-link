const express = require('express')
const router = express.Router()

const LinkController = require('../../controllers/user/linkController')
const AuthorizationRouter = require('../../middleware/authorizationRouter')

router.post('/create', AuthorizationRouter, LinkController.create)
router.post('/:shortLink', LinkController.getDetail)

module.exports = router
