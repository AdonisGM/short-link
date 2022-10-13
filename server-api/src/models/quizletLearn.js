const mongoose = require('mongoose')

const {Schema} = mongoose

const QuizletLearn = new Schema({
  ip: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 200,
    required: true,
  },
}, {timestamps: true})

module.exports = mongoose.model('quizletLearn', QuizletLearn)