// const dotenv = require('dotenv');
const functions = require("firebase-functions");
// dotenv.config();
module.exports = {
  bot_token: functions.config().discord.bot_id
};