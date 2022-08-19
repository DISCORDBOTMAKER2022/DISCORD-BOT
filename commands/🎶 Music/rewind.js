const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");

module.exports = {
  name: "rewind",
  aliases: ["rw"],
  category: "🎶 Music",
  permissions: " ",
  description: "Rewind Playing Song",
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
          `Únase al canal de voz para rebobinar la canción`
        )
      ).then((msg) => {
        msg.delete({timeout : 50000})
    })

    //If Bot not connected, return error
    if (!message.guild.me.voice.channel)
      return message.channel.send(
         new MessageEmbed()
                .setColor(ee.color).setDescription(`Nada suena en el canal de voz`)
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
        msg.delete({timeout : 50000})
    })

    let queue = distube.getQueue(message);

     //get the seektime
     let seektime = queue.currentTime + Number(args[0]) * 1000;
     if (seektime >= queue.songs[0].duration * 1000) seektime = queue.songs[0].duration * 1000 - 1;

     distube.seek(message , Number(seektime))


    message.channel.send(
       new MessageEmbed()
                .setColor(ee.color).setDescription(
        `Canción rebobinada a ${Number(args[0])} Segundos \n Por <@${message.author.id}>`
      )
    ).then((msg) => {
        msg.delete({timeout : 50000})
    })
  },
};
