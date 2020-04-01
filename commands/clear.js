module.exports = {
    name: '!limpiar',
    description: 'Limpiar!',
    async execute(msg, args) {
        const fetched = await msg.channel.messages.fetch({limit: 100});
        msg.channel.bulkDelete(fetched);
    },
};