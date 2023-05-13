const Discord = require("discord.js")



module.exports = {

    name: "botinfo", // Coloque o nome do comando do arquivo

    aliases: ["infobot"], // Coloque sinônimos aqui



    run: async (client, message, args) => {



        let servidor = client.guilds.cache.size;

        let usuarios = client.users.cache.size;

        let canais = client.channels.cache.size;

        let ping = client.ws.ping;

        let dono_id = "1100060099604660226"; // Seu ID

        let dono = client.users.cache.get(dono_id);

        let prefixo = ".";

        let versao = "1.6";



        let embed = new Discord.MessageEmbed()

            .setColor("#ffffff")

            .setTimestamp(new Date)

            .setDescription(`<:anotacao:1101654861784821913>  | Olá, tudo bem? me chamo, **[${client.user.username}](https://discord.gg/RcDZkKaGpM)**  e fui desenvolvido por vtznnx ( unico ), um sistema avançado.





\ **・<:users:1101653913876303892> | Desenvolvedores: ** [vtznx#0001](https://discord.gg/RcDZkKaGpM)

\ **・<a:Load:1101670678320652318> | Linguagem: ** [node.js](https://nodejs.org/en/)

\ **・<:config:1101660875863097424> | Versão: ** ${versao}



\ **・🏓 | Ping:** ${ping}`);







        message.reply({ embeds: [embed] })







    }

}