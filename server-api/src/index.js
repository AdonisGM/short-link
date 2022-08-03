const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('express')

require('dotenv').config()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// api for admin

// api for user
app.use('/api/auth', require('./routers/user/authRouter'))
app.use('/api/user', require('./routers/user/userRouter'))
app.use('/api/link', require('./routers/user/linkRouter'))

app.listen(3000, () => {
  mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_DATABASE}`, {useNewUrlParser: true})
    .then(() => {
        console.log('-= Connected to MongoDB =-')
        console.log(`-= server started =-`)
      },
    )
    .catch(err => console.log(err))
})
