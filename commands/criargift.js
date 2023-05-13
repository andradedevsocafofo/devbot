const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/gifts.json" });

module.exports = {
    name: "criar", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<a:emoji_83:1101311855852527676> | Você não está na lista de pessoas!`)
       function codigo() {
        var gerados = "";
        var codigos = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
         for (var i = 0; i < 12; i++)
           gerados += codigos.charAt(Math.floor(Math.random() * codigos.length));
         return gerados;
       }
        
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('concluir')
            .setEmoji('<a:yes:1101312252696608788>')
            .setLabel('Continuar')
            .setStyle('SUCCESS'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('cancelar')
            .setEmoji('<a:emoji_83:1101311855852527676>')
            .setLabel('Cancelar')
            .setStyle('DANGER'),
        );
        
        const gerado = codigo()        
        const embed = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Criação de Gift Card ✨`)
          .addField(`<:DS_caixa:1101307199285899295> Estoque:`, `Nenhum...`)
          .addField(`<a:yes:1101312252696608788> Código:`, `${gerado}`)
          .setColor(config.get(`color`))], components: [row]})
        
        const interação = embed.createMessageComponentCollector({ componentType: "BUTTON", });
          interação.on("collect", async (interaction) => {
           if (message.author.id != interaction.user.id) {
             return;
           }

           if (interaction.customId === "concluir") {
             interaction.deferUpdate()
             const idcodigo = gerado
              db.set(`${idcodigo}.idgift`, `${idcodigo}`)
              db.set(`${idcodigo}.status`, `Disponivel`)
              db.push(`${idcodigo}.estoque`, `${idcodigo}`)
              const a = db.get(`${idcodigo}.estoque`);
              const removed = a.splice(0, 1);
              db.set(`${idcodigo}.estoque`, a);
               
             message.channel.send(`<a:Load:1101670678320652318> | Envie os novos estoques no chat!`).then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
             collector.on("collect", message => {
               collector.stop();
               message.delete()
               var estoque = message.content.split('\n');            
               for (let i = 0; i != estoque.length; i++) {
                 db.push(`${idcodigo}.estoque`, `${estoque[i]}`)

                 if(i + 1 === estoque.length) {
                   var texto = ""
                   var quant = 1
                   var estoque = `${db.get(`${idcodigo}.estoque`)}`.split(',');
            
                   for(let i in estoque) {
                     texto = `${texto}${quant}° | ${estoque[i]}\n`
                     quant++
                   }
                     
                   row.components[0].setDisabled(true)
                   row.components[1].setDisabled(true)
                   msg.edit(`<a:yes:1101312252696608788> | Gift \`${gerado}\`\ Criado com sucesso!`)
                   const embednew = new Discord.MessageEmbed()
                     .setTitle(`${config.get(`title`)} | Criação de Gift Card`)
                     .addField(`<:DS_caixa:1101307199285899295> Estoque:`, `${texto}`)
                     .addField(`<a:yes:1101312252696608788> Código:`, `${gerado}`)
                     .setColor(config.get(`color`))
                   embed.edit({ embeds: [embednew], components: [row] })
                 }
               }
             })
           })
         }
        
           if (interaction.customId === "cancelar") {
             embed.delete()
             message.channel.send(`<a:emoji_83:1101311855852527676> | Cancelado...`)
           }
         })
       }
     };