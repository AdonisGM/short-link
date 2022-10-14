const QuizletLearn = require('../../models/quizletLearn');
const QuizletKey = require('../../models/quizletKey');
const { nanoid } = require('nanoid');

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
  upload: async (req, res, next) => {
    const { data } = req.body;

    const quizletKey = new QuizletKey({
      code: nanoid(32),
      data,
    });

    const temp = await quizletKey.save();
    console.log(temp);

    return res.status(200).json({
      message: 'Success',
      code: temp.code,
    });
  },
  download: async (req, res, next) => {
    const { code } = req.body;

    const temp = await QuizletKey.findOne({ code });

    if (!temp) {
      return res.status(404).json({ message: 'Not found' });
    }

    return res.status(200).json({
      message: 'Success',
      data: temp.data,
    });
  },
};

module.exports = QuizletController;
