const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "configstatus", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.channel.send(`<a:emoji_83:1101311855852527676> | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('tokenconfig')
            .setEmoji('<:emojimercadopago:1080137282113261609>')
            .setLabel('Mercado Pago')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('prefixconfig')
            .setEmoji('<:comandos212:1101661061532352602>')
            .setLabel('Prefixo')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('statusconfig')
            .setEmoji('<a:yes:1101312252696608788>')
            .setLabel('Status')
            .setStyle('SECONDARY'),
        );
        
        const embed = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Configuração dos status`)
          .setDescription(`
<:mercadopago:1101675925281718292>・Token Mercado Pago: \`\Token Seguro\`
<:comandos212:1101661061532352602>・Prefixo: \`${config.get(`prefix`)}\`
<a:yes:1101312252696608788>・Status do Bot: \`${config.get(`status`)}\``)
          .setColor(config.get(`color`))], components: [row]})
        const interação = embed.createMessageComponentCollector({ componentType: "BUTTON", });
         interação.on("collect", async (interaction) => {
          if (message.author.id != interaction.user.id) {
           return;
          }

          if (interaction.customId === "tokenconfig") {
            interaction.deferUpdate();
            message.channel.send("<a:Load:1101670678320652318> | Qual o novo access token do seu mp?").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", access_token => {
                 access_token.delete()
                 const newt = access_token.content
                 config.set(`access_token`, newt)
                 msg.edit("<a:yes:1101312252696608788> | Alterado!")
                            
                 const embednew = new Discord.MessageEmbed()
                   .setTitle(`${config.get(`title`)} | Configuração dos status`)
                   .setDescription(`
<:mercadopago:1101675925281718292>・Token Mercado Pago: \`\Token Seguro\`
<:comandos212:1101661061532352602>・Prefixo: \`${config.get(`prefix`)}\`
<a:yes:1101312252696608788>・Status do Bot: \`${config.get(`status`)}\``)
                   .setColor(config.get(`color`))
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }
          if (interaction.customId === "prefixconfig") {
            interaction.deferUpdate();
            message.channel.send("<a:Load:1101670678320652318> | Qual o novo prefixo do bot?").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", prefix => {
                 prefix.delete()
                 const newt = prefix.content
                 config.set(`prefix`, newt)
                 msg.edit("<a:yes:1101312252696608788> | Alterado!")
                            
                 const embednew = new Discord.MessageEmbed()
                   .setTitle(`${config.get(`title`)} | Configuração dos status`)
                   .setDescription(`
<:mercadopago:1101675925281718292>・Token Mercado Pago: \`\Token Seguro\`
<:comandos212:1101661061532352602>・Prefixo: \`${config.get(`prefix`)}\`
<a:yes:1101312252696608788>・Status do Bot: \`${config.get(`status`)}\``)
                   .setColor(config.get(`color`))
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }
          if (interaction.customId === "statusconfig") {
            interaction.deferUpdate();
            message.channel.send("<a:Load:1101670678320652318> | Qual os novos status do bot?").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", status => {
                 status.delete()
                 const newt = status.content
                 config.set(`status`, newt)
                 msg.edit("<a:yes:1101312252696608788> | Alterado!")
                            
                 const embednew = new Discord.MessageEmbed()
                   .setTitle(`${config.get(`title`)} | Configuração dos status`)
                   .setDescription(`
<:emojimercadopago:1080137282113261609>・Token Mercado Pago: \`\Token Seguro\`
<:comandos212:1101661061532352602>・Prefixo: \`${config.get(`prefix`)}\`
<a:yes:1101312252696608788>・Status do Bot: \`${config.get(`status`)}\``)
                   .setColor(config.get(`color`))
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }
           })
         }
       };