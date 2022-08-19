const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const { MessageButton, MessageActionRow } = require("discord-buttons")

module.exports = {
  name: 'setupverify',
  aliases: ['vr'],
  category: '🚫 Administration',
  memberpermissions: [],
  cooldown: 5,
  description: 'Verify a User',
  usage: '[COMMAND] + [Channel] + [Question]',
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args, prefix) => {

    const role = message.guild.roles.cache.find(r => r.name === "Verificado")
    message.guild.roles.everyone.setPermissions([])

    if (!role) {
      message.guild.roles.create({
        data: {
          name: "Verificado",
          color: "PINK",
          permissions: [
            "SEND_MESSAGES", "READ_MESSAGE_HISTORY"
          ]
        }
      })
    }

    const channel = message.guild.channels.create('Verificar', {
      type: "text",
      topic: "Este canal se usa para verificar usuarios y si elimina este canal Verificar sistema no funcionará, debe volver a configurar Verificar sistema",
      // parent: channel.id,
      permissionOverwrites: [
        {
          id: message.guild.id,
          allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES'],
        },
        { //giving the Bot himself permissions
          id: client.user.id,
          allow: ["MANAGE_MESSAGES", "MANAGE_CHANNELS", "ADD_REACTIONS", "SEND_MESSAGES", "MANAGE_ROLES"]
        }
      ]
    }).then((ch) => {
      ch.updateOverwrite(ch.guild.roles.everyone, { VIEW_CHANNEL: true, SEND_MESSAGES: false });

      message.guild.channels.cache.forEach((channelnew) => {
        channelnew.updateOverwrite(channelnew.guild.roles.everyone, { VIEW_CHANNEL: false, SEND_MESSAGES: false });
        channelnew.updateOverwrite(channelnew.guild.roles.cache.find(rr => rr.name === "Verificado"), { VIEW_CHANNEL: true, SEND_MESSAGES: true, CONNECT: true, SPEAK: true })
      })
      const embed = new MessageEmbed()
        .setTitle('Verification')
        .setColor("GREEN")
        .setTitle(` ** Verifíquese a sí mismo **`)
        .setDescription('\`\`Haga clic en el botón de abajo para verificar \`\`')

      const add = new MessageButton()
        .setStyle("green")
        .setLabel("Verificarme!")
        .setID("AddVerifiedRole")

      const row = new MessageActionRow()
        .addComponent([add])

      // message.channel.send({ component: row, embed: embed })
      ch.send({ component: row, embed: embed })


    })

  }
}