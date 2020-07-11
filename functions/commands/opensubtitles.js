const OS = require("opensubtitles-api");
const OpenSubtitles = new OS({
  useragent: "TemporaryUserAgent",
  username: "mgkluck",
  password: "Mgkluck05@",
  ssl: true
});

async function login(query) {
  return await OpenSubtitles.search({
    sublanguageid: "esp",
    query: query // returns url to gzipped subtitles, defaults to false
  })
    .then(subtitles => subtitles)
    .catch(errors => console.log(errors));
}

module.exports = {
  name: "!opensubtitle",
  description: "Opensubtitle!",
  async execute(msg, args) {
    await login(args).then(res => console.log(res));
  }
};
