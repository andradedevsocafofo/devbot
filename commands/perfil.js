const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const db2 = new JsonDatabase({ databasePath:"./databases/myJsonDatabase.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });

module.exports = {
    name: "perfil", 
    run: async(client, message, args) => {
     if (!message.mentions.members.first()) {
      const id = message.author.id;
      const gasto = db2.get(`${id}.gastosaprovados`) || "0";
      const pedidos = db2.get(`${id}.pedidosaprovados`) || "0";
        
      const embed = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Seu perfil`)
        .addField(`<a:planeta:1101307098840703046>・Produtos comprados:`, `${pedidos} compras realizadas.`)
        .addField(`<:Dinheiro:1101308742672322660>・Dinheiro gasto:`, `R$ ${gasto} Reais`)
        .setThumbnail(message.member.user.avatarURL())
        .setColor(config.get(`color`))
      message.reply({embeds: [embed]})
     } else {
      const id = message.mentions.users.first();
      const gasto = db2.get(`${id.id}.gastosaprovados`) || "0";
      const pedidos = db2.get(`${id.id}.pedidosaprovados`) || "0";
        
      const embed = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Perfil do ${id.username}`)
        .addField(`<a:planeta:1101307098840703046> ・Produtos comprados:`, `${pedidos} compras realizadas.`)
        .addField(`<:Dinheiro:1101308742672322660> ・Dinheiro gasto:`, `R$ ${gasto} Reais`)
        .setThumbnail(message.member.user.avatarURL())
        .setColor(config.get(`color`))
      message.reply({embeds: [embed]})
     }
   }
}