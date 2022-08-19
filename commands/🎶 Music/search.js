const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");

module.exports = {
  name: "search",
  aliases: ["sr"],
  category: "🎶 Music",
  permissions: "",
  description: "Search Songs to Play",
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
      return message.channel
        .send(
           new MessageEmbed()
                .setColor(ee.color).setDescription(
            `Únase al canal de voz para buscar y reproducir canciones`
          )
        )
        .then((msg) => {
          msg.delete({ timeout: 50000 });
        });

    //if they are not in the same channel, return error only check if connected
    if (
      message.guild.me.voice.channel &&
      channel.id != message.guild.me.voice.channel.id
    )
      return message.channel
        .send(
           new MessageEmbed()
                .setColor(ee.color).setDescription(
            `Únase a mi canal de voz ${message.guild.me.voice.channel.name}`
          )
        )
        .then((msg) => {
          msg.delete({ timeout: 50000 });
        });

    //if no arguments return error
    if (!args.length)
      return message
        .reply(
           new MessageEmbed()
                .setColor(ee.color).setDescription(
            `Ingrese el nombre de la canción para buscar y reproducir la canción`
          )
        )
        .then((msg) => {
          msg.delete({ timeout: 50000 });
        });

    // if don't have persm
    if (
      !message.guild.me
        .permissionsIn(message.member.voice.channel)
        .has("CONNECT")
    )
      return message
        .reply(
           new MessageEmbed()
                .setColor(ee.color).setDescription(`No estoy permitido en el canal de voz`)
        )
        .then((msg) => {
          msg.delete({ timeout: 50000 });
        });

    if (args.length) {
      message.channel
        .send( new MessageEmbed()
 .setColor(ee.color).setDescription(`buscando ${args.join(" ")}`))
        .then((msg) => {
          msg.delete({ timeout: 50000 });
        });
    }

    distube.play(message);
  },
};
