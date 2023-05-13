const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const db2 = new JsonDatabase({ databasePath:"./databases/myJsonDatabase.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "status", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<a:emoji_83:1101311855852527676> | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      const embed = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Status de vendas`)
        .addField(`<:DS_caixa:1101307199285899295>・Produtos vendidos:`, `${db2.get("pedidostotal") || "0"} vendas realizadas.`)
        .addField(`<:Dinheiro:1101308742672322660>・Dinheiro arrecadado:`, `R$ ${db2.get("gastostotal") || "0"} Reais`)
        .setColor(config.get(`color`))
      message.reply({embeds: [embed]})
    }
}