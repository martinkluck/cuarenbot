const axios = require("axios");
async function getTranslate(text) {
  return await axios
    .get("https://translate.yandex.net/api/v1.5/tr.json/translate", {
      params: {
        key:
          "trnsl.1.1.20200330T210354Z.c3ad92306196a8dc.e08712eb7f1f93faad122d86c583de1600ee7c9a",
        text: text,
        lang: "es",
      },
    })
    .then(res => res.data.text[0]);
}
module.exports = {
  name: "!fortuna",
  description: "Fortuna!",
  async execute(msg, args) {
    if (args.join(" ") === "categories") {
      msg.channel.send(
        "Valid categories are: all, bible, computers, cookie, definitions, miscellaneous, people, platitudes, politics, science, and wisdom."
      );
      return;
    }
    let url = "http://yerkee.com/api/fortune/" + args.join(" ");
    await axios
      .get(url)
      .then(response => getTranslate(response.data.fortune))
      .then(res => {
        msg.reply(res);
        return null;
      })
      .catch(error => console.log(error));
  }
};
