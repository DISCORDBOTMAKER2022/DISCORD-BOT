const ms = require('ms')
const { Client, Message, MessageEmbed } = require('discord.js');
const client = require('../index')
const antilinkdata = require('../utils/models/antilink');

/** 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */

client.on('message', (message) => {
    try {
        const messagedelete = () => {
            message.delete();
            message.reply(
                new MessageEmbed()
                    .setDescription(`\`\` Noob No envíe ningún tipo de enlace aquí porque soy el robot anti-enlace 😁😁 \`\``)
            ).then((msg) => {
                msg.delete({ timeout: 5000 })
            })
        }
        antilinkdata.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (
                message.content.match("shttps://") ||
                message.content.match("sdiscord.gg") ||
                message.content.match("swww.")
            ) {
                messagedelete()
            }
        })
    } catch (e) {
        message.channel.send(e)
    }
})