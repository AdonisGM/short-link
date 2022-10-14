const mongoose = require('mongoose');

const { Schema } = mongoose;

const QuizletKey = new Schema(
  {
    code: {
      type: String,
      trim: true,
      minLength: 1,
      maxLength: 200,
      required: true,
    },
    data: {
      type: String,
      trim: true,
      minLength: 1,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('quizletKey', QuizletKey);
