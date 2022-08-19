const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");
var { getData, getPreview, getTracks } = require("spotify-url-info");

module.exports = {
  name: "play",
  aliases: ["p"],
  category: "🎶 Music",
  permissions: "",
  description: "Play Song in Discord",
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
            `Únase al canal de voz para reproducir la canción`
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
            `Ingrese el nombre de la canción para reproducir la canción`
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
    //do things for spotify track
    else if (
      args.join(" ").includes("track") &&
      args.join(" ").includes("open.spotify")
    ) {
      //get data
      let info = await getPreview(args.join(" "));
      //play track
      return distube.play(message, info.artist + " " + info.title);
    }
    if (args.length) {
      message.channel
        .send( new MessageEmbed()
 .setColor(ee.color).setDescription(`Buscando ${args.join(" ")}`))
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });
    }
    distube.play(message, args.join(" "));
  },
};
