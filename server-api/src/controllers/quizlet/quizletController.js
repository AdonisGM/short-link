const QuizletLearn = require('../../models/quizletLearn');
const QuizletKey = require('../../models/quizletKey');
const { nanoid } = require('nanoid');
const cheerio = require('cheerio');
const request = require('request-promise');

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
  crawlData: async (req, res, next) => {
    const { url } = req.body;

    request(
      {
        uri: url,
        headers: {
          'User-Agent': 'Request-Promise',
        },
      },
      (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);

          const data = [];

          const title = $('.SetPage-titleWrapper').first().text();

          $('.SetPageTerms-term').each((i, el) => {
            const term = $(el)
              .find('.SetPageTerm-wordText')
              .find('span')
              .html()
              .replace(/<br\s*\/?>/gm, '\n');
            const definition = $(el)
              .find('.SetPageTerm-definitionText')
              .find('span')
              .html()
              .replace(/<br\s*\/?>/gm, '\n');

            const isTermAnswer = term.length < definition.length;
            const answer = isTermAnswer ? term : definition;
            const question = isTermAnswer ? definition : term;

            data.push({
              question: question,
              answer: answer.toUpperCase(),
            });
          });
          

          console.log(data.length);

          return res.status(200).json({
            message: 'Success',
            data: {
              course: data,
              title,
            },
          });
        }
      }
    );
  },
};

module.exports = QuizletController;
