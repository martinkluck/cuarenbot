const axios = require("axios");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "!tiempo",
  description: "Tiempo!",
  async execute(msg, args) {
    let city = args.join(" ");
    await axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0ce46f59c8c79704a018239066279614`
      )
      .then(({ data }) => {
        /* const embed = new MessageEmbed()
          .setColor(0xff0000)
          .setTitle(`Tiempo en ${data.name}`)
          .addField("Temperatura", data.main.temp + "°")
          .addField("RealFeel", data.main.feels_like + "°")
          .addField("Min", data.main.temp_min + "°")
          .addField("Max", data.main.temp_max + "°")
          .addField("Precion", data.main.pressure + " hPa")
          .addField("Humedad", data.main.humidity + "%"); */
        const embed =
          `Tiempo en ${data.name} \n` +
          "Temperatura: " +
          data.main.temp +
          "°\n" +
          "RealFeel: " +
          data.main.feels_like +
          "°\n" +
          "Min: " +
          data.main.temp_min +
          "°\n" +
          "Max: " +
          data.main.temp_max +
          "°\n" +
          "Precion: " +
          data.main.pressure +
          " hPa\n" +
          "Humedad: " +
          data.main.humidity +
          "%";
        msg.channel.send(embed);
        return null;
      })
      .catch((error) => {
        msg.reply("Vuelve a intentarlo, parece que esa ciudad no existe");
      });
  },
};
