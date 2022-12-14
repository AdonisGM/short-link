const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('express');
const cors = require('cors');

require('dotenv').config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// change max limit of request body
app.use(bodyParser.json({ limit: '5mb' }));

// parse application/json
app.use(bodyParser.json());
// allow cors * for now
app.use(cors(
  {
    origin: '*',
  },
));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to ShortLink API, v0.1' });
});

// api for admin

// api for user
app.use('/api/auth', require('./routers/user/authRouter'));
app.use('/api/user', require('./routers/user/userRouter'));
app.use('/api/link', require('./routers/user/linkRouter'));
app.use('/api/quizlet', require('./routers/quizlet/quizletRouter'));

// telegram bot
require('./telegram/telegram');

app.listen(process.env.PORT, () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_DATABASE}`,
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log(
        `-= server started =-` +
          `\n` +
          `-= listening on port ${process.env.PORT} =-`
      );
    })
    .catch((err) => console.log(err));
});
