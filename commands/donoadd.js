const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });

module.exports = {
    name: "donoadd",
    run: async(client, message, args) => {
      const user = args[0]
      if (message.author.id !== `seu id`) return message.reply(`<a:emoji_83:1101311855852527676> | Apenas o criador do bot pode usar isso!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if (!args[0]) return message.reply(`<a:emoji_83:1101311855852527676> | Você não selecionou ninguem!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`<a:emoji_83:1101311855852527676> | Você não pode selecionar duas pessoas de vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(user === `${config.get(`owner`)}`) return message.reply(`<a:yes:1101312252696608788> | Essa pessoa já é o dono do bot!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(isNaN(args)) return message.reply(`<a:emoji_83:1101311855852527676> | Você só pode adicionar IDs!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
      message.reply(`<a:yes:1101312252696608788> | Permissão de dono adicionada!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      config.set(`owner`, user)
      if(user === `${perms.get(`${user}_id`)}`) return
       else {
        perms.set(`${user}_id`, user)
       }
      }
     }