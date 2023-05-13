const Discord = require("discord.js")

const { JsonDatabase, } = require("wio.db");

const config = new JsonDatabase({ databasePath:"./config.json" });



module.exports = {

    name: "creditos",

    run: async(client, message, args) => {

        const embed = new Discord.MessageEmbed()

        .setTitle(`Olá, seja bem-vindo(a) ao ${config.get(`title`)}`)

        .setDescription(`comando de credito `)

        .setColor(`#ffffff`)

        .setImage(`https://media.discordapp.net/attachments/1101330543972450414/1101649798723026974/standard_1.gif`)



    }};



    interaction.followUp( { embeds: [embed], ephemeral: true})