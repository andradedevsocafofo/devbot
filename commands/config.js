const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });

module.exports = {
    name: "config", 
    run: async(client, message, args) => {
        if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<a:emoji_83:1101311855852527676> | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        if(!args[0]) return message.reply(`<a:emoji_83:1101311855852527676> | Você não selecionou nenhum ID!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        if(args[1]) return message.reply(`<a:emoji_83:1101311855852527676> | Você não pode selecionar dois IDs de uma vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        if(args[0] !== `${db.get(`${args[0]}.idproduto`)}`) return message.reply(`<a:emoji_83:1101311855852527676> | Esse ID de produto não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
        const adb = args[0];
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('descgerenciar')
                    .setEmoji('<:descrio:1101683835810369587>')
                    .setLabel('Descrição')
                    .setStyle('SUCCESS'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('nomegerenciar')
                    .setEmoji('<a:planeta:1101307098840703046>')
                    .setLabel('Nome')
                    .setStyle('SUCCESS'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('precogerenciar')
                    .setEmoji('<:Dinheiro:1101308742672322660>')
                    .setLabel('Preço')
                    .setStyle('SUCCESS'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('deletegerenciar')
                    .setEmoji('<:errado:1101307668792082442>')
                    .setLabel('Excluir')
                    .setStyle('DANGER'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('rlgerenciar')
                    .setEmoji('<a:Load:1101670678320652318>')
                    .setLabel('Atualizar')
                    .setStyle('PRIMARY'),
            );
        
        const msg = await message.reply({ embeds: [new Discord.MessageEmbed()
            .setTitle(`${config.get(`title`)} | Configurando o(a) ${adb}`)
            .setDescription(`
\`\`\` ${db.get(`${adb}.desc`)}\`\`\`
<a:planeta:1101307098840703046>・Nome: ${db.get(`${adb}.nome`)}
<:Dinheiro:1101308742672322660>・Preço: R$${db.get(`${adb}.preco`)}
<:DS_caixa:1101307199285899295>・Estoque: ${db.get(`${adb}.conta`).length}`)
.setImage('https://media.discordapp.net/attachments/1101330543972450414/1101649798723026974/standard_1.gif')
            .setColor(config.get(`color`))], components: [row]})
        
            const interação = msg.createMessageComponentCollector({
               componentType: "BUTTON",
            })
  
            interação.on("collect", async (interaction) => {
               if (message.author.id != interaction.user.id) {
               return;
            }
                
                if (interaction.customId === "deletegerenciar") {
                    msg.delete()
                    msg.channel.send("<a:yes:1101312252696608788> | Excluido!")
                    db.delete(adb)
                }
                if (interaction.customId === "precogerenciar") {
                   interaction.deferUpdate();
                    msg.channel.send("<a:Load:1101670678320652318> | Qual o novo preço?").then(msg => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                        collector.on("collect", message => {
                            message.delete()
                            db.set(`${adb}.preco`, `${message.content.replace(",", ".")}`)
                            msg.edit("<a:yes:1101312252696608788> | Alterado!")
                        })
                    })
                }
                if (interaction.customId === "nomegerenciar") {
        interaction.deferUpdate();
                    msg.channel.send("<a:Load:1101670678320652318> | Qual o novo nome?").then(msg => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                        collector.on("collect", message => {
                            message.delete()
                            db.set(`${adb}.nome`, `${message.content}`)
                            msg.edit("<a:yes:1101312252696608788> | Alterado!")
                        })
                    })
                }
    if (interaction.customId === 'descgerenciar') {
        interaction.deferUpdate();
                    msg.channel.send("<a:Load:1101670678320652318> | Qual a nova descrição?").then(msg => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                        collector.on("collect", message => {
                            message.delete()
                            db.set(`${adb}.desc`, `${message.content}`)
                            msg.edit("<a:yes:1101312252696608788> | Alterado!")
                        })
                    })
                }
    if (interaction.customId === 'rlgerenciar') {
        interaction.deferUpdate();
         const embed = new Discord.MessageEmbed()
           .setTitle(`${config.get(`title`)} | Configurando o(a) ${adb}`)
           .setDescription(`
           \`\`\` ${db.get(`${adb}.desc`)}\`\`\`
           <a:planeta:1101307098840703046>・Nome: ${db.get(`${adb}.nome`)}
<:Dinheiro:1101308742672322660>・Preço: R$${db.get(`${adb}.preco`)}Reais
<:DS_caixa:1101307199285899295>・Estoque: ${db.get(`${adb}.conta`).length}`)
.setImage('https://media.discordapp.net/attachments/1101330543972450414/1101649798723026974/standard_1.gif')
           .setColor(config.get(`color`))
           msg.edit({ embeds: [embed] })
           message.channel.send("<a:yes:1101312252696608788> | Atualizado!")
                }
              })
            }
           }