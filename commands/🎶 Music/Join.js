const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");
const { prefix } = require("../..");

module.exports = {
  name: "stop",
  aliases: ["s"],
  category: "🎶 Music",
  permissions: " ",
  description: "Stop Playing Song",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { channel } = message.member.voice;

    //if member not connected return error
    if (!channel)
      return message.channel.send(
         new MessageEmbed()
                .setColor(ee.color).setDescription(
          `Únase al canal de voz para reproducir la canción`
        )
      ).then((msg) => {
        msg.delete({timeout : 50000})
    })

    //If Bot not connected, return error
    if (message.guild.me.voice.channel)
      return message.channel.send(
         new MessageEmbed()
                .setColor(ee.color).setDescription(`Ya estoy conectado en el canal`)
      ).then((msg) => {
        msg.delete({timeout : 50000})
    })

    //if they are not in the same channel, return error only check if connected
    if (
      message.guild.me.voice.channel &&
      channel.id != message.guild.me.voice.channel.id
    )
      return message.channel.send(
         new MessageEmbed()
                .setColor(ee.color).setDescription(
          `Únase a mi canal de voz ${message.guild.me.voice.channel.name}`
        )
      ).then((msg) => {
        msg.delete({timeout : 5000})
    })

    message.channel.send(
       new MessageEmbed()
                .setColor(ee.color).setDescription(
        ` <@${message.author.id}> Unido ${channel} Canal , Reproducir canción con ${prefix}play`
      )
    ).then((msg) => {
        msg.delete({timeout : 50000})
    })
  },
};
