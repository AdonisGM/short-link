const MessageTelegram = {
  Error: (message) => {
    return `❌ : ${message}`;
  },
  Success: (message) => {
    return `✅ : ${message}`;
  },
  Warning: (message) => {
    return `⚠️ : ${message}`;
  },
  Info: (message) => {
    return `🔍 : ${message}`;
  },
  Loading: (message) => {
    return `⌛ : ${message}`;
  }
}

module.exports = MessageTelegram;