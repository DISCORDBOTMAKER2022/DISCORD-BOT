const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');


module.exports = {
  name: 'jointocreate',
  aliases: ["j2c"],
  category: '⚙️ Config',
  memberpermissions: ['MANAGE_CHANNELS'],
  cooldown: 5,
  description: "Setup The Join to Create  in Guild",
  usage: "jointocreate",
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args, prefix) => {

    const channel = message.guild.channels.cache.find(ch => ch.name === "🔊｜ᴊᴏɪɴ-ᴛᴏ-ᴄʀᴇᴀᴛᴇ");

    if (!channel) {
      message.guild.channels.create('🔊｜ᴊᴏɪɴ-ᴛᴏ-ᴄʀᴇᴀᴛᴇ', {
        type: 'voice',
        topic: "Este canal se usó para UNIRSE PARA CREAR y si elimina este bot de chat de canal no funciona, debe volver a configurar el chatbot",
        // parent: channel.id,
        permissionOverwrites: [
          {
            id: message.guild.id,
            allow: ['VIEW_CHANNEL', 'SPEAK', 'CONNECT'],
          },
          { //giving the Bot himself permissions
            id: client.user.id,
            allow: ["MANAGE_MESSAGES", "MANAGE_CHANNELS", "ADD_REACTIONS", "SEND_MESSAGES", "MANAGE_ROLES"]
          }
        ]
      }).then((ch) => {
        return message.channel.send(
          new MessageEmbed()
            .setColor(ee.color)
            .setDescription(` > ** Unirse para crear Configuración completada Ir <#${ch.id}> y únete para crear tu canal de voz ** \n > ** No cambie el nombre de unirse para crear un canal, de lo contrario, no funcionará ** `)
        )
      })
    }

    if (channel) {
      message.channel.send(
        new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`> **El canal de chat ya está configurado <#${channel.id}> ** \n > ** No cambie el nombre del canal del bot de chat, de lo contrario, el chat no funcionará ** `)
      )
    }

  }
}

