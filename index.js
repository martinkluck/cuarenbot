
const debug_express = require('debug')('express');
const debug_discord = require('debug')('discord');
const express = require('express');
const app = express();

const { port, bot_token } = require('./config');

app.get("/", (req,res) => {
    res.send("Discord Coronabot")
})
app.listen(port,()=>{
    debug_express("Servidor web levantado en puerto: ", port)
})

const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands');

bot.login(bot_token);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.on('message', msg => {
    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase();
    console.info(`Called command: ${command}`);

    if (!bot.commands.has(command)) return;

    try {
        bot.commands.get(command).execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
});