const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const backup = require("discord-backup");


module.exports = {
  name: 'backup',
  aliases: ["backupserver"],
  category: '⚙️ Config',
  memberpermissions: ['ADMINISTRATOR'],
  cooldown: 5,
  description: "Create and Load Backup in a Guild",
  usage: "backup",
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args, prefix) => {

    if (message.author.id === message.guild.owner.id) return;

    if (!args[0]) {
      message.channel.send(
        new MessageEmbed()
          .setColor(ee.color)
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .setDescription(`1. \`\`Para crear un tipo de copia de seguridad ${prefix}backup create\`\` \n 2.  \`\`Para cargar el tipo de copia de seguridad ${prefix}backup load \`\` \n 3. \`\`A la información sobre un tipo de copia de seguridad ${prefix}backup info \`\` `)
          .setFooter(ee.footertext)
      )
    }

    // creating backup
    if (args[0] === 'create') {
      // Create the backup
      backup.create(message.guild, {
        jsonBeautify: true
      }).then((backupData) => {
        // And send informations to the backup owner
        message.author.send("¡Se ha creado la copia de seguridad! Para cargarlo, escriba este comando en el servidor de su elección: `" + prefix + "backup load " + backupData.id);
        message.channel.send(new MessageEmbed()
          .setDescription('Se ha creado una copia de seguridad y se ha guardado en mis datos. para cargar su copia de seguridad, vaya a su dms, copie la identificación que le di y luego cárguela.')
          .setColor(ee.color)
          .setFooter('Copia de seguridad creada en')
          .setTimestamp());
      }).catch((e) => {
        return message.reply(
          new MessageEmbed()
            .setDescription(`'Abre tu dms, no puedo enviarte el código de respaldo!'`)
        )
      })
    }


    // loading backup
    if (args[0] === 'load') {
      let backupID = args[1];
      if (!backupID) {
        return message.reply(
          new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`Debe especificar una ID de copia de seguridad válida!`)
            .setFooter(ee.footertext)
        )
      }

      // Fetching the backup to know if it exists
      backup.fetch(backupID).then(async () => {
        // If the backup exists, request for confirmation
        message.channel.send(
          new MessageEmbed()
            .setColor(ee.color)
            .setDescription(":warning: | Cuando se cargue la copia de seguridad, ¡se reemplazarán todos los canales, roles, etc.! Escriba `-confirm` para confirmar!")
            .setFooter(ee.footertext)
        );
        await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "-confirm"), {
          max: 1,
          time: 20000,
          errors: ["time"]
        }).catch((err) => {
          // if the author of the commands does not confirm the backup loading
          return message.channel.send(
            new MessageEmbed()
              .setColor(ee.color)
              .setDescription(":x: | ¡Se acabó el tiempo! Carga de copia de seguridad cancelada!")
              .setFooter(ee.footertext)
          );
        });
        // When the author of the command has confirmed that he wants to load the backup on his server
        message.author.send(
          new MessageEmbed()
            .setColor(ee.color)
            .setDescription(":white_check_mark: | Empezar a cargar la copia de seguridad!")
            .setFooter(ee.footertext)
        );
        // Load the backup
        backup.load(backupID, message.guild).then(() => {
          // When the backup is loaded, delete them from the server
          backup.remove(backupID);
        }).catch((err) => {
          // If an error occurred
          return message.author.send(
            new MessageEmbed()
              .setColor(ee.color)
              .setDescription(":x: | Lo siento, ocurrió un error... Verifique que tenga permisos de administrador!")
              .setFooter(ee.footertext)
          );
        });
      }).catch((err) => {
        console.log(err);
        // if the backup wasn't found
        return message.channel.send(
          new MessageEmbed()
            .setColor(ee.color)
            .setDescription(":x: | No se encontró ninguna copia de seguridad para `" + backupID + "`!")
            .setFooter(ee.footertext)
        );
      });

    }


    // info backup


    if (args[0] === 'info') {
      let backupID = args[1];
      if (!backupID) {
        return message.reply(
          new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`Debe especificar una ID de copia de seguridad válida!`)
            .setFooter(ee.footertext)
        )
      }

      // fetch backup

      backup.fetch(backupID).then((backupInfos) => {
        const date = new Date(backupInfos.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth() + 1).toString(), dd = date.getDate().toString();
        const formatedDate = `${yyyy}/${(mm[1] ? mm : "0" + mm[0])}/${(dd[1] ? dd : "0" + dd[0])}`;
        let embed = new MessageEmbed()
          .setAuthor("Información de respaldo")
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          // Display the backup ID
          .addField(`>\`\` Identificación de respaldo = ${backupInfos.id} \`\``, false)
          // Displays the server from which this backup comes
          .addField(`> \`\` identificación del servidor = ${backupInfos.data.guildID}\`\``, false)
          // Display the size (in mb) of the backup
          .addField(`> \`\` Tamaño de copia de seguridad = ${backupInfos.size} \`\``, false)
          // Display when the backup was created
          .addField(`> \`\` Creado en ${formatedDate} \`\``, false)
          .setColor(ee.color)
          .setFooter(ee.footertext)
        message.channel.send(embed);
      }).catch((err) => {
        // if the backup wasn't found
        return message.channel.send(
          new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`> \`\` Sin copia de seguridad para ${backupID} \`\``)
            .setFooter(ee.footertext)
        );
      });
    }
  }
}
