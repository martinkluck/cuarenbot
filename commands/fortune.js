const axios = require('axios');
async function getTranslate(text){
    return await axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate', {
        params: {
            key: 'trnsl.1.1.20200330T210354Z.c3ad92306196a8dc.e08712eb7f1f93faad122d86c583de1600ee7c9a',
            text: text,
            lang: 'es'
        }
    }).then(res => res.data.text[0]);
}
module.exports = {
    name: '!fortuna',
    description: 'Fortuna!',
    async execute(msg, args) {
        let url = "http://yerkee.com/api/fortune";
        await axios.get(url)
        .then(async response => {
            getTranslate(response.data.fortune).then(res => {
                msg.reply(res);
            });
        });
    },
};