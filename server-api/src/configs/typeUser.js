const typeUser = {
  basic: {
    PRICE: 0,
    MAX_SHORT_LINKS: 10,
    MAX_CUSTOM_LINKS: 1,
    MAX_PASSWORD_LINKS: 1,
    MAX_QR_CODE: 1,
  },
  vip: {
    PRICE: 2,
    MAX_SHORT_LINKS: 100,
    MAX_CUSTOM_LINKS: 10,
    MAX_PASSWORD_LINKS: 50,
    MAX_QR_CODE: 50,
  },
  premium: {
    PRICE: 6,
    MAX_SHORT_LINKS: Number.MAX_VALUE,
    MAX_CUSTOM_LINKS: Number.MAX_VALUE,
    MAX_PASSWORD_LINKS: Number.MAX_VALUE,
    MAX_QR_CODE: Number.MAX_VALUE,
  }
}

module.exports = typeUser
