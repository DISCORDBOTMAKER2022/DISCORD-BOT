const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const moment = require('moment');


module.exports = {
  name: 'roleinfo',
  aliases: ['rinfo'],
  category: '🔰 Info',
  memberpermissions: [],
  cooldown: 5,
  description: 'Show Info Of a Role',
  usage: "roleinfo <@ROLE>",
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args, prefix) => {
    try {
      var role = message.mentions.roles.first();
      if (!role) return message.channel.send(
        new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`Role Not Found`)
      )

      //create the EMBED
      const embeduserinfo = new MessageEmbed()
        .setColor(ee.color)
      embeduserinfo.setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
      embeduserinfo.setAuthor("Información:   " + role.name, message.guild.iconURL({ dynamic: true }), "https://discord.gg/FQGXbypRf8")
      embeduserinfo.addField('**❱ Name:**', `\`${role.name}\``, true)
      embeduserinfo.addField('**❱ ID:**', `\`${role.id}\``, true)
      embeduserinfo.addField('**❱ Color:**', `\`${role.hexColor}\``, true)
      embeduserinfo.addField('**❱ fecha de creacion:**', "\`" + moment(role.createdAt).format("DD/MM/YYYY") + "\`\n" + "`" + moment(role.createdAt).format("hh:mm:ss") + "\`", true)
      embeduserinfo.addField('**❱ Posición:**', `\`${role.rawPosition}\``, true)
      embeduserinfo.addField('**❱ Cuenta de miembro:**', `\`${role.members.size} Los miembros lo tienen\``, true)
      embeduserinfo.addField('**❱ Izado:**', `\`${role.hoist ? "✔️" : "❌"}\``, true)
      embeduserinfo.addField('**❱ Mencionable:**', `\`${role.mentionable ? "✔️" : "❌"}\``, true)
      embeduserinfo.addField('**❱ permisos:**', `${role.permissions.toArray().map(p => `\`${p}\``).join(", ")}`)
      embeduserinfo.setFooter(ee.footertext, ee.footericon)
      //send the EMBED
      message.channel.send(embeduserinfo)
    } catch (e) {
      message.channel.send(
        new MessageEmbed()
          .setColor(ee.color)
          .setDescription(e)
      )

    }
  }
}