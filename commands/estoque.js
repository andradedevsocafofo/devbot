const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });

module.exports = {
    name: "estoque", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<a:emoji_83:1101311855852527676> | Você não está na lista de pessoas!`)
      if(!args[0]) return message.reply(`<a:emoji_83:1101311855852527676> | Você não selecionou nenhum ID!`)
      if(args[1]) return message.reply(`<a:emoji_83:1101311855852527676> | Você não pode selecionar dois IDs de uma vez!`)
      if(args[0] !== `${db.get(`${args[0]}.idproduto`)}`) return message.reply(`<a:emoji_83:1101311855852527676> | Esse ID de produto não é existente!`)

      const adb = args[0];
      const itens = db.get(`${adb}.conta`);
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('addestoque')
            .setEmoji('➕')
            .setLabel('Adicionar')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('remestoque')
            .setEmoji('➖')
            .setLabel('Remover')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('bckestoque')
            .setEmoji('📩')
            .setLabel('Backup')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('clestoque')
            .setEmoji('🗑️')
            .setLabel('Limpar')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('rlestoque')
            .setEmoji('⚙️')
            .setLabel('Atualizar')
            .setStyle('SECONDARY'),
        );
        
        const msg = await message.reply({ embeds: [new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Gerenciando o(a) ${adb}`)
        .setDescription(`
📋・Descrição: ${db.get(`${adb}.desc`)}
<a:planeta:1101307098840703046>・Nome: ${db.get(`${adb}.nome`)}
<:Dinheiro:1101308742672322660>・Preço: ${db.get(`${adb}.preco`)} Reais
<:DS_caixa:1101307199285899295>・Estoque: ${db.get(`${adb}.conta`).length}`)
.setImage('https://media.discordapp.net/attachments/1101330543972450414/1101649798723026974/standard_1.gif')
        .setColor(config.get(`color`))], components: [row]})
      const interação = msg.createMessageComponentCollector({ componentType: "BUTTON", })
      interação.on("collect", async (interaction) => {
       if (message.author.id != interaction.user.id) { 
        return
       }
                
       if (interaction.customId === "addestoque") {
         interaction.deferUpdate();
         msg.channel.send("<a:emojiplaneta:1078036508872806460> | Envie os novos produtos no chat!").then(msg => {
          const filter = m => m.author.id === interaction.user.id;
          const collector = msg.channel.createMessageCollector({ filter })
          collector.on("collect", message => {
             const content = message.content.split('\n');
             const contasnb = message.content.split('\n').length;
             var contas = content;
             var etapa = 0;
             var etapaf = contasnb;
             collector.stop();
             message.delete()
             const timer = setInterval(async function() {
             if(etapa === etapaf) {
              msg.edit(`<a:yes:1101312252696608788> | Pronto, \`${etapaf}\`\ Produtos foram adicionados com sucesso!`)
              clearInterval(timer)
              return;
             }
             const enviando = contas[etapa];
             db.push(`${adb}.conta`, `${enviando}`)
             etapa = etapa + 1
           }, 100)   
        })
      })
    }
   if (interaction.customId === "remestoque") {
     interaction.deferUpdate();
     msg.channel.send("<:DS_caixa:1101307199285899295> | Envie a linha do produto que você quer remover!").then(msg => {
      const filter = m => m.author.id === interaction.user.id;
      const collector = msg.channel.createMessageCollector({ filter, max: 1 })
       collector.on("collect", message1 => {
          const a = db.get(`${adb}.conta`);
          a.splice(message1.content, 1)
          db.set(`${adb}.conta`, a);
          message1.delete()
          msg.edit(`<a:yes:1101312252696608788> | O Produto número \`${message1}\`\ foi removido com sucesso!`)
        })
      })
    }
   if (interaction.customId === 'clestoque') {
     interaction.deferUpdate();
     const a = db.get(`${adb}.conta`);
     const removed = a.splice(0, `${db.get(`${adb}.conta`).length}`);
      db.set(`${adb}.conta`, a);
      msg.channel.send("<a:yes:1101312252696608788> | Estoque limpo!")
    }
   if (interaction.customId === 'bckestoque') {
        interaction.deferUpdate();
        message.channel.send("<a:yes:1101312252696608788> | Enviado com sucesso!")
        var quantia = 1;
        var contas = `${db.get(`${adb}.conta`)}`.split(',');
        var backup = `• ${contas.join(`\n• `)}`
        const embed = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Backup feito`)
        .setDescription(`\`\`\`${backup} \`\`\``)
        .setColor(config.get(`color`))
        message.author.send({embeds: [embed] })
      }
                
    if (interaction.customId === 'rlestoque') {
        interaction.deferUpdate();
         const embed = new Discord.MessageEmbed()
           .setTitle(`${config.get(`title`)} | Gerenciando o(a) ${adb}`)
           .setDescription(`
           📋・Descrição: ${db.get(`${adb}.desc`)}
<a:planeta:1101307098840703046>・Nome: ${db.get(`${adb}.nome`)}
<:Dinheiro:1101308742672322660>・Preço: ${db.get(`${adb}.preco`)} Reais
<:DS_caixa:1101307199285899295>・Estoque: ${db.get(`${adb}.conta`).length}`)
.setImage('https://media.discordapp.net/attachments/1101330543972450414/1101649798723026974/standard_1.gif')
           .setColor(config.get(`color`))
           msg.edit({ embeds: [embed] })
           msg.channel.send("<a:yes:1101312252696608788> | Atualizado!")
                }
              })
            }
          }