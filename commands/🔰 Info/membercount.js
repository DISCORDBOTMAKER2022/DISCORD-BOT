const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config/config.json");

module.exports = {
  name: 'membercount',
  category: "🔰 Info",
  aliases: ['members'],
  cooldown: 5,
  description: 'Show all Member',
  usage: 'membercount',
  memberpermissions: [" "],
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {
    message.channel.send(
      new MessageEmbed()
        .setDescription(`** 🔰  Miembros totales** :- \`\`${message.guild.memberCount}\`\` \n ** ✨ Robots totales** :- \`\`${message.guild.members.cache.filter(member => member.user.bot).size}\`\``))
  }
}