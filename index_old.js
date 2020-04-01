
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

const axios = require('axios');
const { Client, MessageEmbed } = require('discord.js');
const client = new Client();

client.on('ready', () => {
    debug_discord(`Bot is ready as ${client.user.tag}`);
    // client.user.setStatus('dnd');
    // console.log(client.user.presence.status);

    // const test = client.channels.TextChannel;
    // console.log(test);
});

client.on('message', async message => {
    // Recibiendo mensaje
    // console.log(message.content);
    if(message.content == 'ping'){
        message.reply('pong');
    }
    if(message.content == 'hola'){
        message.channel.send(`Hola ${message.author}`);
    }
    if(message.content == '!martin'){
        message.channel.send('https://www.youtube.com/user/mgkluck07');
    }
    if(message.content == '!pretty'){
        const embed = new MessageEmbed()
        .setColor(0xff0000)
        .addField('Algo', 'OH!');
        message.channel.send(embed);
    }
    if(message.content == '!clear'){
        const fetched = await message.channel.messages.fetch({limit: 100});
        // console.log(fetched);
        message.channel.bulkDelete(fetched);
        debug_discord('Messages cleaned');
    }
    if(message.content.includes('!tiempo')){
        let city = message.content.split('!tiempo ')[1];
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0ce46f59c8c79704a018239066279614`)
        .then(response => {
            let result = response.data;
            // console.log(result);
            const embed = new MessageEmbed()
            .setColor(0xff0000)
            .setTitle(`Tiempo en ${result.name}`)
            .addField('Temperatura', result.main.temp + '°')
            .addField('RealFeel', result.main.feels_like + '°')
            .addField('Min', result.main.temp_min + '°')
            .addField('Max', result.main.temp_max + '°')
            .addField('Precion', result.main.pressure + ' hPa')
            .addField('Humedad', result.main.humidity + '%');
            message.channel.send(embed);
        });  
    }
    if(message.content.includes('!starwars')){
        let faction = message.content.split('!starwars ')[1] && message.content.split('!starwars ')[1].includes('Jedi') ? 0 : 1
        axios.get(`http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuoteFromFaction/${faction}`)
        .then(response => {
            axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate', {
                params: {
                    key: 'trnsl.1.1.20200330T210354Z.c3ad92306196a8dc.e08712eb7f1f93faad122d86c583de1600ee7c9a',
                    text: response.data.starWarsQuote,
                    lang: 'es'
                }
            }).then(res => {
                if (res.data.text[0] !== message.content) {
                    message.reply(res.data.text[0])
                }
            });
        });        
    }
    if(message.content.includes('!chiste')){
        axios.get(`https://geek-jokes.sameerkumar.website/api?format=json`)
        .then(response => {
            axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate', {
                params: {
                    key: 'trnsl.1.1.20200330T210354Z.c3ad92306196a8dc.e08712eb7f1f93faad122d86c583de1600ee7c9a',
                    text: response.data.joke,
                    lang: 'es'
                }
            }).then(res => {
                if (res.data.text[0] !== message.content) {
                    message.reply(res.data.text[0]);
                }
            });
        });        
    }
    if(message.content.includes('!bitcoin')){
        axios.get(`https://api.coindesk.com/v1/bpi/currentprice.json`)
        .then(response => {
            message.reply("U$S " + response.data.bpi.USD.rate_float.toFixed(2));
        });        
    }
})

client.login(bot_token);