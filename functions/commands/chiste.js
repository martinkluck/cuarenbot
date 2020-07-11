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
    name: '!chiste',
    description: 'Chiste!',
    async execute(msg, args) {
        let url = "https://sv443.net/jokeapi/v2/joke/Any";
        // let url = "https://geek-jokes.sameerkumar.website/api?format=json";
        await axios.get(url)
        .then(async response => {
            if(response.data.type === 'single'){
                getTranslate(response.data.joke).then(res => {
                    msg.reply(res);
                });
            }else{
                getTranslate(response.data.setup).then(res => {
                    msg.reply(res);
                });
                setTimeout(() => {
                    getTranslate(response.data.delivery).then(res => {
                        msg.reply(res);
                    });
                },3000)
            }
        });
    },
};