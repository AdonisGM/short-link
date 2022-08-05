const express = require('express')
const router = express.Router()

const LinkController = require('../../controllers/user/linkController')
const AuthorizationRouter = require('../../middleware/authorizationRouter')

router.post('/:shortLink', LinkController.getDetail)
router.post('/create', AuthorizationRouter, LinkController.create)

module.exports = router
