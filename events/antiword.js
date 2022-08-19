const ms = require('ms')
const { Client, Message, MessageEmbed } = require('discord.js');
const client = require('../index')
const antiwordsData = require('../utils/models/antiwords');

/** 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */


const badwords = [
    "pito", "puto", "puta", "put@", "culo", "sexo", "estupida", "estupido", "sexo", "verga", "mierda"
]


client.on('message', (message) => {
    try {
        const messagedelete = () => {
            message.delete();
            message.reply(
                new MessageEmbed()
                    .setDescription(`\`\` Noob no envíe ningún tipo de mala palabra aquí porque soy el bot anti-malas palabras 😁😁 \`\``)
            ).then((msg) => {
                msg.delete({ timeout: 50000 })
            })
        }
        antiwordsData.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (
                message.content.match(badwords)
            ) {
                messagedelete()
            }
        })
    } catch (e) {
        message.channel.send(e)
    }
})