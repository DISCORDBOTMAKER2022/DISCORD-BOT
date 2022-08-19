const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix, config } = require("..");
const distube = require("../utils/distubeClient");
const ee = require('../config/embed.json')
/**
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports = async (client, message, args) => {
  const status = (queue) =>
    `Volume: ${queue.volume}% | Filter: ${queue.filter || " ❌ Apagado"} | Loop: ${
    queue.repeatMode
      ? queue.repeatMode == 2
        ? "Toda la cola"
        : " ✅ Esta canción"
      : "Apagado"
    } | Autoplay: ${queue.autoplay ? " ✅ On" : " ❌ Off"}`;

  // play song
  distube.on("playSong", (message, queue, song) => {
    message.channel
      .send(
        new MessageEmbed()
          .setColor(ee.color)
          .setTitle(`Reproducir canción`)
          .setDescription(`Song: [\`${song.name}\`](${song.url})`)
          .addField("Solicitado por:", `>>> ${song.user}`, true)
          .addField(
            "Duración:",
            `>>> \`${queue.formattedCurrentTime} / ${song.formattedDuration}\``,
            true
          )
          .setThumbnail(song.thumbnail)
          .setFooter(status(queue))
      )
      .then(async (msg) => {
        await msg.react("⏭");
        await msg.react("⏯");
        await msg.react("🔉");
        await msg.react("🔊");
        await msg.react("🔁");

        const filter = (reaction, user) =>
          ["⏭", "⏯", "🔉", "🔊", "🔁", "⏹"].includes(
            reaction.emoji.id || reaction.emoji.name
          ) && user.id !== message.client.user.id;
        var collector = await msg.createReactionCollector(filter, {
          time: song.duration > 0 ? song.duration * 1000 : 600000,
        });

        collector.on("collect", async (reaction, user) => {
          //return if no queue available
          if (!queue) return;

          //create member out of the user
          const member = reaction.message.guild.member(user);

          //remoe the reaction
          reaction.users.remove(user);

          if (
            !member.voice.channel ||
            member.voice.channel.id !== member.guild.me.voice.channel.id
          )
            return message.channel.send(
              new MessageEmbed()
                .setColor(ee.color).setDescription(
                  " Debe unirse a un canal de voz"
                )
            );

          switch (reaction.emoji.id || reaction.emoji.name) {
            // skip reaction
            case "⏭":
              queue.playing = true;
              reaction.users.remove(user).catch(console.error);
              queue.connection.dispatcher.end();
              message.channel
                .send(
                  new MessageEmbed()
                    .setColor(ee.color).setDescription(
                      `\`Cancion saltada\` por ${message.author.username}`
                    )
                )
                .then((msg) => {
                  msg.delete({
                    timeout: 50000,
                  });
                });
              collector.stop();
              break;

            // pause and resume reaction

            case "⏯":
              reaction.users.remove(user).catch(console.error);
              if (queue.playing) {
                queue.playing = !queue.playing;
                distube.pause(message);
                message.channel
                  .send(
                    new MessageEmbed()
                      .setColor(ee.color).setDescription(
                        `⏸ Cancion pasusada por <@${message.author.id}>`
                      )
                  )
                  .then((msg) => {
                    msg.delete({
                      timeout: 50000,
                    });
                  });
              } else {
                queue.playing = !queue.playing;
                distube.resume(message);
                message.channel
                  .send(
                    new MessageEmbed()
                      .setColor(ee.color).setDescription(
                        `▶ Canción reanudada por <@${message.author.id}>`
                      )
                  )
                  .then((msg) => {
                    msg.delete({
                      timeout: 5000,
                    });
                  });
              }
              break;

            // decrease Volume
            case "🔉":
              reaction.users.remove(user).catch(console.error);
              if (queue.volume - 10 <= 0) queue.volume = 0;
              else queue.volume = queue.volume - 10;
              queue.connection.dispatcher.setVolumeLogarithmic(
                queue.volume / 100
              );
              queue.textChannel;
              message.channel
                .send(
                  new MessageEmbed()
                    .setColor(ee.color).setDescription(
                      `🔉 Disminuyó el volumen, el volumen es ahora ${queue.volume}%`
                    )
                )
                .then((msg) => {
                  msg.delete({
                    timeout: 50000,
                  });
                });
              break;

            // increase Volume
            case "🔊":
              reaction.users.remove(user).catch(console.error);
              if (queue.volume + 10 >= 1000) queue.volume = 100;
              else queue.volume = queue.volume + 10;
              queue.connection.dispatcher.setVolumeLogarithmic(
                queue.volume / 100
              );
              message.channel
                .send(
                  new MessageEmbed()
                    .setColor(ee.color).setDescription(
                      `🔊 Aumentó el volumen, el volumen es ahora ${queue.volume}%`
                    )
                )
                .then((msg) => {
                  msg.delete({
                    timeout: 50000,
                  });
                });
              break;

            // Loop reaction
            case "🔁":
              reaction.users.remove(user).catch(console.error);
              queue.loop = !queue.loop;
              message.channel
                .send(
                  new MessageEmbed()
                    .setColor(ee.color).setDescription(
                      `el bucle es ahora ${queue.loop ? "**✅ on**" : "**❌ off**"}`
                    )
                )
                .then((msg) => {
                  msg.delete({
                    timeout: 50000,
                  });
                });
              break;

            // Stop reaction
            case "⏹":
              reaction.users.remove(user).catch(console.error);
              queue.songs = [];
              message.channel
                .send(
                  new MessageEmbed()
                    .setColor(ee.color).setDescription(
                      `⏹ La música es detenida por <@${message.author.id}>`
                    )
                )
                .then((msg) => {
                  msg.delete({
                    timeout: 50000,
                  });
                });
              try {
                queue.connection.dispatcher.end();
              } catch (error) {
                console.error(error);
                queue.connection.disconnect();
              }
              collector.stop();
              break;

            default:
              reaction.users.remove(user).catch(console.error);
              break;
          }
        });
        collector.on("end", () => {
          msg.reactions.removeAll();
          msg.delete({
            timeout: 100000,
          });
        });
      });
  });

  // add song
  distube.on("addSong", (message, queue, song) => {
    message.channel
      .send(
        new MessageEmbed()
          .setColor(ee.color)
          .setTitle("🎶 Canción añadida!")
          .setDescription(
            `>>> Cancion: [\`${song.name}\`](${song.url}) \n Duration 🎱 \`${song.formattedDuration}\` \n Tracks ${queue.songs.length}`
          )
          .setFooter(`Solicitado por: <@${message.author.id}>\n${status(queue)}}`)
      )
      .then((msg) => {
        msg.delete({ timeout: 50000 });
      });
  });

  // add list
  distube.on("addList", (message, queue, playlist) => {
    message.channel
      .send(
        new MessageEmbed()
          .setColor(ee.color)
          .setTitle("🎶 Lista añadida!")
          .setDescription(
            `>>> List: [\`${playlist.name}\`](${
            playlist.url
            }) \n Duracion 🎱 \`${
            playlist.formattedDuration
            }\` \n Tracks ${playlist.songs.length} \n To Queue${status(
              queue
            )}`
          )
          .setFooter(`Solicitado por: ${message.author.tag}\n${status(queue)}}`)
      )
      .then((msg) => {
        msg.delete({ timeout: 50000 });
      });
  });

  // add playlist
  distube.on("playList", (message, queue, playlist) => {
    message.channel
      .send(
        new MessageEmbed()
          .setColor(ee.color)
          .setTitle("🎶 Lista de reproducción agregada!")
          .setDescription(
            `>>> PlayList: [\`${playlist.name}\`](${playlist.url}) \n Duration 🎱 \`${playlist.formattedDuration}\` \n Tracks ${playlist.songs.length} \n Añadido por: ${playlist.user}`
          )
          .setFooter(`Solicitado por: ${message.author.tag}\n${status(queue)}}`)
      )
      .then((msg) => {
        msg.delete({ timeout: 50000 });
      });
  });

  // search result
  distube.on("searchResult", (message, result) => {
    let i = 0;
    message.channel.send(
      new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`Tu resultado de búsqueda >>> ${result.length}`)
        .addField(
          `**Celige una opción de abajo**\n${result
            .map(
              (song) =>
                `**${++i}**. ${song.name} - \`${song.formattedDuration}\``
            )
            .join("\n")}\n*Ingrese cualquier otra cosa o espere 60 segundos para cancelar*`,
          true
        )
        .setFooter(
          `Solicitado por: ${
          message.author.tag
          } , ${message.author.displayAvatarURL({ dynamic: true })}}}`
        )
    );
  });

  // search cancel
  distube.on("searchCancel", () => {
    message.channel
      .send(new MessageEmbed()
        .setColor(ee.color).setDescription(`Su búsqueda cancelada`))
      .then((msg) => {
        msg.delete({ timeout: 50000 });
      });
  });
  distube.on("error", (message, e) => {
    console.log(e);
  });

  distube.on("initQueue", (queue) => {
    queue.autoplay = false;
    queue.volume = 75;
    queue.repeatMode = false;
  });

  distube.on("finish", (message) => {
    message.channel
      .send(
        new MessageEmbed()
          .setColor(ee.color).setTitle(
            `La canción está terminada`
          )
      )
      .then((msg) => {
        msg.delete({ timeout: 50000 });
      });
  });

  distube.on("empty", (message) => {
    message.channel
      .send(
        new MessageEmbed()
          .setColor(ee.color).setDescription(
            `nada reproduciendo \n estoy en VC \nGracias a mi dueño`
          )
      )
      .then((msg) => {
        msg.delete({ timeout: 50000 });
      });
  });
};
