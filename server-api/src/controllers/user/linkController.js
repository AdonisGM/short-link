const errorHandle = require('../../configs/errorHandle')
const ShortLink = require('../../models/shortLink')
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const {nanoid} = require('nanoid')
const validator = require('validator')
const TypeUser = require('../../configs/typeUser')

const LinkController = {
  create: async (req, res, next) => {
    if (!req.body) {
      const error = errorHandle['validation-error-00001'](req)
      return res.status(error.status).json(error)
    }

    const {name, shortLink, originalLink, password, description} = req.body
    if (!name || !originalLink) {
      const keys = []
      if (!name) keys.push('name')
      if (!originalLink) keys.push('originalLink')

      const error = errorHandle['validation-error-00002'](req, keys)
      return res.status(error.status).json(error)
    }

    if (typeof name !== 'string' || typeof originalLink !== 'string') {
      const keys = []
      if (typeof name !== 'string') keys.push('name')
      if (typeof originalLink !== 'string') keys.push('originalLink')

      const error = errorHandle['validation-error-00003'](req, keys)
      return res.status(error.status).json(error)
    }

    if (validator.isLength(name.trim(), {min: 1, max: 200}) === false) {
      const error = errorHandle['validation-error-00003'](req, 'name')
      return res.status(error.status).json(error)
    }

    if (validator.isURL(originalLink.trim()) === false) {
      const error = errorHandle['validation-error-00003'](req, ['originalLink'])
      return res.status(error.status).json(error)
    }

    if (shortLink !== undefined && typeof shortLink === 'string') {
      if (!validator.isLength(shortLink.trim(), {min: 1, max: 200}) || !shortLink.match(/^[a-zA-Z0-9\-]+$/)) {
        const error = errorHandle['validation-error-00003'](req, ['shortLink'])
        return res.status(error.status).json(error)
      }
    }

    if (password !== undefined && typeof password === 'string') {
      if (!validator.isLength(password.trim(), {min: 8, max: 200})) {
        const error = errorHandle['validation-error-00003'](req, ['password'])
        return res.status(error.status).json(error)
      }
    }

    if (description !== undefined && typeof description === 'string') {
      if (!validator.isLength(description.trim(), {min: 1, max: 1500})) {
        const error = errorHandle['validation-error-00003'](req, ['description'])
        return res.status(error.status).json(error)
      }
    }

    const listLinkOwner = await ShortLink.find({userId: req.user.id})
    const numberLinkOwner = listLinkOwner.length
    const numberLinkHasPassword = listLinkOwner.filter(link => link.password !== undefined).length
    const numberCustomLink = listLinkOwner.filter(link => link.isCustomShortLink).length

    if (req.user.accountType === 'basic' || req.user.accountType === 'vip') {
      if (numberLinkOwner >= TypeUser[req.user.accountType].MAX_SHORT_LINKS) {
        const error = errorHandle['short-link-error-00004'](req)
        return res.status(error.status).json(error)
      }
      if (numberLinkHasPassword >= TypeUser[req.user.accountType].MAX_PASSWORD_LINKS && password !== undefined) {
        const error = errorHandle['short-link-error-00005'](req)
        return res.status(error.status).json(error)
      }
      if (numberCustomLink >= TypeUser[req.user.accountType].MAX_CUSTOM_LINKS && shortLink !== undefined) {
        const error = errorHandle['short-link-error-00006'](req)
        return res.status(error.status).json(error)
      }
    }

    const hashPassword = password ? await bcrypt.hash(password, 10) : undefined

    const newShortLink = new ShortLink({
      name: name.trim(),
      userId: req.user.id,
      originalLink: originalLink.trim(),
      shortLink: shortLink ? shortLink.trim() : nanoid(10),
      isCustomShortLink: !!shortLink,
      password: hashPassword,
      description: description ? description.trim() : undefined,
    })

    try {
      await newShortLink.save()
      return res.status(201).json({
        message: 'Link created successfully',
      })
    } catch (e) {
      const error = errorHandle['mongoose-error-00004'](req)
      return res.status(error.status).json(error)
    }
  },
  getDetail: async (req, res, next) => {
    const shortLink = await ShortLink.findOne({shortLink: req.params.shortLink})

    if (!shortLink) {
      const error = errorHandle['mongoose-error-00005'](req)
      return res.status(error.status).json(error)
    }

    if (shortLink.isActive === false) {
      const error = errorHandle['short-link-error-00001'](req)
      return res.status(error.status).json(error)
    }

    const {password} = req.body

    if (shortLink.password && password === undefined) {
      const error = errorHandle['short-link-error-00002'](req)
      return res.status(error.status).json(error)
    }

    if (shortLink.password && password !== undefined) {
      const isValidPassword = await bcrypt.compare(password, shortLink.password)
      if (!isValidPassword) {
        const error = errorHandle['short-link-error-00003'](req)
        return res.status(error.status).json(error)
      }
    }

    const ownerLink = await User.findOne({_id: shortLink.userId})

    shortLink.clicks += 1
    await shortLink.save()

    return res.status(200).json({
      message: 'Get detail successfully',
      data: {
        name: shortLink.name,
        originalLink: shortLink.originalLink,
        shortLink: shortLink.shortLink,
        description: shortLink.description,
        clicks: shortLink.clicks,
        owner: {
          name: ownerLink.name,
          email: ownerLink.email,
        },
      },
    })
  },
}

module.exports = LinkController
