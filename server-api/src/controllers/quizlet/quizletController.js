const QuizletLearn = require('../../models/quizletLearn')

const QuizletController = {
  getIp: async (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const quizletLearn = new QuizletLearn({
      ip,
    });

    const temp = await quizletLearn.save();
    console.log(temp);

    return res.status(204).json();
  },
};

module.exports = QuizletController;
