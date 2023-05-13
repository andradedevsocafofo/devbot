const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "limpar", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<a:emoji_83:1101311855852527676> | Você não está na lista de pessoas!`)
      setTimeout(() => message.channel.bulkDelete(100).catch(err => {
        return message.channel.send(`<a:emoji_83:1101311855852527676> | Ocorreu algum erro!`);
      }), 400)
      setTimeout(() => message.delete().then(msg => {
        return message.channel.send(`<a:yes:1101312252696608788> | Mensagens deletadas!`)
      }), 300)
   }
}