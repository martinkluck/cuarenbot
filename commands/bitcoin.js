const axios = require('axios');
module.exports = {
    name: '!bitcoin',
    description: 'Bitcoin!',
    execute(msg, args) {
        axios.get(`https://api.coindesk.com/v1/bpi/currentprice.json`)
        .then(response => {
            msg.reply("U$S " + response.data.bpi.USD.rate_float.toFixed(2));
        });
    },
};