const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  bot_token: process.env.TOKEN,
  port: process.env.PORT
};