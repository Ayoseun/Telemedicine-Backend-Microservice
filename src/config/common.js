const dotenv = require('dotenv');
dotenv.config();
class COMMON_CONFIG {
  static SECURITY_KEY = {
    USER: process.env.DB_USER || '',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_HOST: process.env.DB_HOST || '',
    DB_PORT: process.env.DB_PORT || 0,
    DB_NAME: process.env.DB_NAME || '',
    PAYSTACK_SECRET:process.env.PAYSTACK_SECRET_KEY||'',
    USER: process.env.DB_USER || '',
    DELLYMAN_AUTH:process.env.DELLYMAN_AUTH||'',
    DELLYMAN_APIKEY:process.env.DELLYMAN_APIKEY||''
  }

  static NETWORK_CONFIG = {
    PORT: process.env.PORT || '',
    WSS_PORT: process.env.WSSPORT || '',
    PAYSTACK_URL:"https://api.paystack.co"||""

  }
}

module.exports = COMMON_CONFIG
