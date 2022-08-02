const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use('/api/auth', require('./routers/authRouter'))

app.listen(3000, () => {
  mongoose.connect('mongodb+srv://nmtung:Tung88644264@shortlink.8yumh.mongodb.net/test', {useNewUrlParser: true})
  console.log(`-= server started =-`)
})
