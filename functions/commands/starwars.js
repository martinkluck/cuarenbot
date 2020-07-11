const axios = require("axios");
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = {
  name: "!starwars",
  description: "Star Wars",
  async execute(msg, args) {
    let faction = 0;
    switch (args.join(" ")) {
      case "Jedi":
        faction = 0;
        break;
      case "Lado Oscuro":
        faction = 1;
        break;
      case "Rebels":
        faction = 2;
        break;
      case "Mandolorians":
        faction = 3;
        break;
      case "Republica":
        faction = 4;
        break;

      default:
        faction = getRandomInt(0, 4);
        break;
    }
    await axios
      .get(
        `http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuoteFromFaction/${faction}`
      )
      .then((response) =>
        axios.get("https://translate.yandex.net/api/v1.5/tr.json/translate", {
          params: {
            key:
              "trnsl.1.1.20200330T210354Z.c3ad92306196a8dc.e08712eb7f1f93faad122d86c583de1600ee7c9a",
            text: response.data.starWarsQuote,
            lang: "es"
          }
        })
      )
      .then((res) => {
        if (res.data.text[0] !== msg.content) {
          msg.reply(res.data.text[0]);
        }
        return null;
      });
  }
};
