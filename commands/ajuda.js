const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath: "./config.json" });

module.exports = {
  name: "ajuda",
  run: async (client, message, args) => {
    const row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId('retornar')
          .setEmoji('<:config:1101660875863097424>')
          .setDisabled(true)
          .setStyle('PRIMARY'),
      )
      .addComponents(
        new Discord.MessageButton()
          .setCustomId('proxima')
          .setEmoji('<:config:1101660875863097424>')
          .setDisabled(false)
          .setStyle('PRIMARY'),
      );

    const embed = await message.reply({
      embeds: [new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Meus Comandos`)
        .setDescription(`
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}ajuda - Veja meus comandos
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}anuncio - Envie um anuncio Embed
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}botinfo - Veja minhas info
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}info - Veja info de uma compra
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}perfil - Veja seu perfil
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}status - Veja os status de vendas
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}rendimentos - Veja seus rendimentos
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}pegar - Veja um produto entregue
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}pagar - Sete um id para pago
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}criargift - Crie um Gift
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}criarcupom - Crie um cupom
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}configcupom - Gerencie um cupom
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}limpar - Apague as mensagens do chat
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}limpardm - Apague as mensagens do bot na sua DM
`)
        .setTimestamp()
        .setFooter(`Pagina 1/2`)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(config.get(`color`))], components: [row]
    })
    const interação = embed.createMessageComponentCollector({ componentType: "BUTTON", })
    interação.on("collect", async (interaction) => {
      if (message.author.id != interaction.user.id) { return; }
      if (interaction.customId === 'retornar') {
        interaction.deferUpdate();
        row.components[0].setDisabled(true)
        row.components[1].setDisabled(false)
        const embednew = new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Meus Comandos`)
          .setDescription(`
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}ajuda - Veja meus comandos
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}anuncio - Envie um anuncio Embed
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}botinfo - Veja minhas info
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}info - Veja info de uma compra
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}perfil - Veja seu perfil
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}status - Veja os status de vendas
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}rendimentos - Veja seus rendimentos
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}pegar - Veja um produto entregue
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}pagar - Altere um id para pago
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}criarcupom - Crie um cupom
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}configcupom - Gerencie um cupom
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}clear - Apague as mensagens do chat
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}criados - Veja todos os produtos/cupons/gifts criados
`)
          .setTimestamp()
          .setFooter(`Pagina 1/2`)
          .setThumbnail(client.user.displayAvatarURL())
          .setColor(config.get(`color`))
        embed.edit({ embeds: [embednew], components: [row] })
      }

      if (interaction.customId === 'proxima') {
        interaction.deferUpdate();
        row.components[0].setDisabled(false)
        row.components[1].setDisabled(true)
        const embednew = new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Meus Comandos`)
          .setDescription(`
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}criar - Crie um anuncio
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}setar - Sete um anuncio
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}config - Gerencie um anuncio
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}estoque - Gerencie um estoque
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}rank - Veja o Ranking de Clientes
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}configbot - Configura o bot
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}configcanais - Configura os canais
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}configstatus - Configura os status
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}permadd - Adicione um administrador
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}donoadd - Adicione um dono
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}permdel - Remova um administrador
<:comandos212:1101661061532352602> | ${config.get(`prefix`)}donodel - Remova um dono
`)
          .setTimestamp()
          .setFooter(`Pagina 2/2`)
          .setThumbnail(client.user.displayAvatarURL())
          .setColor(config.get(`color`))
        embed.edit({ embeds: [embednew], components: [row] })
      }
    })
  }
}
