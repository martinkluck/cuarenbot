const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: '!tiempo',
    description: 'Tiempo!',
    async execute(msg, args) {
        let city = args.join(' ');
        console.log(city);
        await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0ce46f59c8c79704a018239066279614`)
        .then(response => {
            let result = response.data;
            const embed = new MessageEmbed()
            .setColor(0xff0000)
            .setTitle(`Tiempo en ${result.name}`)
            .addField('Temperatura', result.main.temp + '°')
            .addField('RealFeel', result.main.feels_like + '°')
            .addField('Min', result.main.temp_min + '°')
            .addField('Max', result.main.temp_max + '°')
            .addField('Precion', result.main.pressure + ' hPa')
            .addField('Humedad', result.main.humidity + '%');
            msg.channel.send(embed);
        })
        .catch(error => {
            msg.reply('Vuelve a intentarlo, parece que esa ciudad no existe');
        });
    },
};