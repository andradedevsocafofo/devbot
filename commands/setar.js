const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });

module.exports = {
    name: "setar", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<a:emoji_83:1101311855852527676> | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if (!args[0]) return message.reply(`<a:emoji_83:1101311855852527676> | Você não selecionou nenhum ID de produto!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`<a:emoji_83:1101311855852527676> | Você não selecionar dois IDs de vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] !== `${db.get(`${args[0]}.idproduto`)}`) return message.reply(`<a:emoji_83:1101311855852527676> | Esse ID de produto não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));

      const row = new Discord.MessageActionRow()               
        .addComponents(
          new Discord.MessageButton()
            .setCustomId(args[0])
            .setLabel('Comprar')
            .setEmoji("<:carrinho_loja:1101307025654300672>")
            .setStyle('SUCCESS'),
      );
        
      const embed = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Store`)
        .setDescription(`
\`\`\`
${db.get(`${args[0]}.desc`)}
\`\`\`
**<a:planeta:1101307098840703046>・Nome:**  ${db.get(`${args[0]}.nome`)} 
**<:Dinheiro:1101308742672322660>・Preço:** R$ ${db.get(`${args[0]}.preco`)} 
**<:DS_caixa:1101307199285899295>・Estoque:**  ${db.get(`${args[0]}.conta`).length} `)
        .setColor(config.get(`color`))
        .setImage('https://media.discordapp.net/attachments/1101330543972450414/1101649798723026974/standard_1.gif')
      message.channel.send({embeds: [embed], components: [row]})
    }
}