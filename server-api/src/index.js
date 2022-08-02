const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use('/api/auth', require('./routers/user/authRouter'))
app.use('/api/user', require('./routers/user/userRouter'))



app.listen(3000, () => {
  mongoose.connect('mongodb+srv://nmtung:Tung88644264@shortlink.8yumh.mongodb.net/test', {useNewUrlParser: true})
    .then(() => {
        console.log('-= Connected to MongoDB =-')
        console.log(`-= server started =-`)
      },
    )
    .catch(err => console.log(err))
})
