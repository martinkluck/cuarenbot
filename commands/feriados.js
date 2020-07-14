const axios = require("axios");
const { MessageEmbed } = require("discord.js");
const getURL = (year) => `https://nolaborables.com.ar/api/v2/feriados/${year}`;
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];
const dayOfWeek = (day, month, year) =>
  days[new Date(year, month, day).getDay()];

const setNext = (holidays) => {
  const now = new Date();
  const today = {
    day: now.getDate(),
    month: now.getMonth() + 1,
  };

  let holiday = holidays.find(
    (h) => (h.mes === today.month && h.dia > today.day) || h.mes > today.month
  );

  if (!holiday) {
    holiday = holidays[0];
  }
  return holiday;
};

module.exports = {
  name: "!feriados",
  description: "Feriados!",
  async execute(msg, args) {
    const year = new Date().getFullYear();
    await axios
      .get(getURL(year))
      .then(({ data }) => setNext(data))
      .then((result) => {
        const embed = new MessageEmbed()
          .setColor(0x5b802e)
          .setTitle("Próximo feriado")
          .addField("Motivo", result.motivo)
          .addField(
            "Fecha",
            `${dayOfWeek(result.dia, result.mes - 1, year)} ${result.dia} | ${
              months[result.mes - 1]
            }`
          )
          .addField("Tipo", result.tipo.toUpperCase());
        msg.channel.send(embed);
        return null;
      })
      .catch((error) => {
        console.log(error);
        msg.reply("Vuelve a intentarlo, parece que hubo un error al buscar.");
      });
  },
};
