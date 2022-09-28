const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const User = require('../models/user');
const ShortLink = require('../models/shortLink');
const bcrypt = require('bcrypt');
const MessageTelegram = require('../configs/messageTelegram');
const TypeUser = require('../configs/typeUser');
const { nanoid } = require('nanoid');

// message to welcome new user
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `Welcome to ShortLink Bot 🤖\nCopyright © ${new Date().getFullYear()} <a href="https://github.com/AdonisGM">AdonisGM</a>\n\nNote: Bot is circulated internally so to be able to register an account please contact admin.\n\n<code>/login @email @password</code> : for link account\n<code>/create @link @name</code> : for create new ShortLink\n<code>/list</code> : for show list ShortLink\n\nAny questions? <a href="https://t.me/nmtung">Contact admin</a>`,
    {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }
  );
});

// link account to bot telegram
bot.onText(/\/login (.+) (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const [, email, password] = match;

  const teleUser = await User.findOne({ telegramId: chatId });
  if (teleUser) {
    await bot.sendMessage(
      chatId,
      MessageTelegram.Warning('Just one account per user')
    );
    return;
  }

  if (!email || !password) {
    await bot.sendMessage(
      chatId,
      MessageTelegram.Warning('Please enter your email and password')
    );
    return;
  }

  const c = await bot.sendMessage(
    chatId,
    MessageTelegram.Loading('Please wait...')
  );
  const selectUser = await User.findOne({ email });

  if (!selectUser) {
    await bot.editMessageText(
      MessageTelegram.Warning('User not found or password incorrect'),
      {
        chat_id: chatId,
        message_id: c.message_id,
      }
    );
    return;
  }

  const isMatch = await bcrypt.compare(password, selectUser.password);
  if (!isMatch) {
    await bot.editMessageText(
      MessageTelegram.Warning('User not found or password incorrect'),
      {
        chat_id: chatId,
        message_id: c.message_id,
      }
    );
    return;
  }

  if (!selectUser.isActive) {
    await bot.editMessageText(
      MessageTelegram.Warning(
        'Your account is deactivate!\n\nContact admin for more information\nEmail: <code>admin@nmtung.dev</code>'
      ),
      {
        chat_id: chatId,
        message_id: c.message_id,
        parse_mode: 'HTML',
      }
    );
    return;
  }

  if (
    selectUser.telegramId &&
    Number.parseInt(selectUser.telegramId) !== chatId
  ) {
    await bot.editMessageText(
      MessageTelegram.Error('User already linked to another telegram account'),
      { chat_id: chatId, message_id: c.message_id }
    );
    return;
  }

  if (
    selectUser.telegramId &&
    Number.parseInt(selectUser.telegramId) === chatId
  ) {
    await bot.editMessageText(
      MessageTelegram.Success('User already linked to this telegram account'),
      {
        chat_id: chatId,
        message_id: c.message_id,
      }
    );
    return;
  }

  selectUser.telegramId = chatId;
  await selectUser.save();

  bot.sendSticker(
    chatId,
    'CAACAgIAAxkBAAEFt95jDibjjM1h0EoIcmaDvfP3csX5xwACNQADrWW8FPWlcVzFMOXgKQQ'
  );
  await bot.editMessageText(
    MessageTelegram.Success(
      'User successfully linked, you can now use /create to create shortlink'
    ),
    { chat_id: chatId, message_id: c.message_id }
  );
});

// create shortlink
bot.onText(/\/create (.+) (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const [, url, name] = match;

  if (!url || !name) {
    await bot.sendMessage(
      chatId,
      MessageTelegram.Warning(
        'Please enter your url and name, with /create [url] [name]'
      )
    );
    return;
  }

  const c = await bot.sendMessage(
    chatId,
    MessageTelegram.Loading('Verifying user...')
  );

  const selectUser = await User.findOne({ telegramId: chatId });
  if (!selectUser) {
    await bot.editMessageText(
      MessageTelegram.Warning(
        'You must login first for link your account with telegram'
      ),
      {
        chat_id: chatId,
        message_id: c.message_id,
      }
    );
    return;
  }

  if (!selectUser.isActive) {
    await bot.editMessageText(
      MessageTelegram.Warning(
        'Your account is deactivate!\n\nContact admin for more information\nEmail: <code>admin@nmtung.dev</code>'
      ),
      {
        chat_id: chatId,
        message_id: c.message_id,
        parse_mode: 'HTML',
      }
    );
    return;
  }

  await bot.editMessageText(
    MessageTelegram.Loading('Creating shortlink, please wait...'),
    {
      chat_id: chatId,
      message_id: c.message_id,
    }
  );

  const listLinkOwner = await ShortLink.find({ userId: selectUser.id });
  const numberLinkOwner = listLinkOwner.length;
  const numberLinkHasPassword = listLinkOwner.filter(
    (link) => link.password !== undefined
  ).length;
  const numberCustomLink = listLinkOwner.filter(
    (link) => link.isCustomShortLink
  ).length;

  if (selectUser.accountType === 'basic' || selectUser.accountType === 'vip') {
    if (numberLinkOwner >= TypeUser[selectUser.accountType].MAX_SHORT_LINKS) {
      await bot.editMessageText(
        MessageTelegram.Error(
          `You have reached the maximum number of shortlinks (${
            TypeUser[selectUser.accountType].MAX_SHORT_LINKS
          })`
        ),
        {
          chat_id: chatId,
          message_id: c.message_id,
        }
      );
      return;
    }
  }

  const newShortLink = new ShortLink({
    name: name.trim(),
    userId: selectUser.id,
    originalLink: url.trim(),
    shortLink: nanoid(10),
    isCustomShortLink: false,
  });

  try {
    await newShortLink.save();
    await bot.editMessageText(
      MessageTelegram.Success(
        `Shortlink successfully created and ready to use

        Copy clipboard: <code>https://s.nmtung.dev/u/${newShortLink.shortLink}</code>
        Open browser: <a href="https://s.nmtung.dev/u/${newShortLink.shortLink}">Click Here</a>`
      ),
      {
        chat_id: chatId,
        message_id: c.message_id,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }
    );
    // copy shortlink to clipboard
  } catch (e) {
    await bot.editMessageText(
      MessageTelegram.Error('Error creating shortlink'),
      {
        chat_id: chatId,
        message_id: c.message_id,
      }
    );
  }
});

// show list shortlink
bot.onText(/\/list/, async (msg, match) => {
  const chatId = msg.chat.id;

  const c = await bot.sendMessage(
    chatId,
    MessageTelegram.Loading('Verifying user...')
  );

  const selectUser = await User.findOne({ telegramId: chatId });
  if (!selectUser) {
    await bot.editMessageText(
      MessageTelegram.Warning(
        'You must login first for link your account with telegram'
      ),
      {
        chat_id: chatId,
        message_id: c.message_id,
      }
    );
    return;
  }

  if (!selectUser.isActive) {
    await bot.editMessageText(
      MessageTelegram.Warning(
        'Your account is deactivate!\n\nContact admin for more information\nEmail: <code>'
      ),
      {
        chat_id: chatId,
        message_id: c.message_id,
      }
    );
    return;
  }

  const listLinkOwner = await ShortLink.find({ userId: selectUser.id });
  const resultTable = listLinkOwner.map((link) => {
    return `&#9755;  ${link.createdAt.toLocaleString()} | ${
      link.name
    } | <a href="https://s.nmtung.dev/u/${link.shortLink}">${
      link.shortLink
    }</a> | ${link.clicks}`;
  });

  bot.editMessageText(
    MessageTelegram.Success(`List shortlink\n\n${resultTable.join('\n')}`),
    {
      chat_id: chatId,
      message_id: c.message_id,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }
  );
});

// method for test
bot.onText(/\/test/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, MessageTelegram.Success('123123'));
});

// method for room
bot.onText(/\/room (.+)/, (msg, match) => {
  const list = [
    {
      id: '1',
      name: 'Room 1',
      link: 'https://meet.google.com/cmo-bdym-koq',
    },
    {
      id: '2',
      name: 'Room 2',
      link: 'https://meet.google.com/eie-bpfz-bmo',
    },
    {
      id: '3',
      name: 'Room 3',
      link: 'https://meet.google.com/gon-invg-omr',
    },
    {
      id: 'fap',
      name: 'Room 3',
      link: 'https://meet.google.com/wqy-pnwj-jgi',
    },
  ];

  const chatId = msg.chat.id;
  const [, value] = match;

  const result = list.find((item) => item.id === value.trim());
  console.log(result);

  const c = bot.sendMessage(
    chatId,
    MessageTelegram.Success(`This is URL room ${result.id}: ${result.link}`),
    {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }
  );
});
