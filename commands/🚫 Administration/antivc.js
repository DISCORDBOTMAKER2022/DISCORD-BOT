const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'antivc',
    aliases: ['novc'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_CHANNELS'],
    cooldown: 5,
    description: 'Prevent a user From Voice Channel',
    usage: '[COMMAND] + [user]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        let voicemember = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if (!voicemember) return message.reply(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`Por favor mencione a un usuario`)
                .setFooter(ee.footertext)
        )

        if (voicemember.id === message.author.id) return message.reply(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`Noob, no puedes HACER Anti-VC tú mismo 🤣🥱🥱`)
                .setFooter(ee.footertext)
        )

        if (message.member.roles.highest.position <= voicemember.roles.highest.position) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`No puede hacer anti-vc este usuario, este usuario tiene el rol más alto/igual que usted`)
                    .setFooter(ee.footertext)
            )
        }

        let antivcrole = message.guild.roles.cache.find((r) => r.name === "ANTI-VC");
        if (!antivcrole) {
            try {
                message.author.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`Función ANTI-VC no encontrada | Déjame crear mi yo mismo, jeje`)
                        .setFooter(ee.footertext)
                )

                let newrole = message.guild.roles.create({
                    data: {
                        name: "ANTI-VC",
                        permissions: []
                    }
                })
                message.guild.channels.cache.filter((ch) => ch.type = "voice")
                    .forEach(async (ch2) => {
                        await ch2.permissionOverwrites(antivcrole, {
                            VIEW_CHANNEL: false,
                            CONNECT: false
                        })
                    })
                message.channel.send(`${(await newrole).name} Creado`)
            } catch (e) {
                message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(e)
                        .setFooter(ee.footertext)
                )
            }
        }

        await voicemember.roles.add(antivcrole.id);
        message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`@<${voicemember.id}>  ahora no puede unirse a los canales de voz`)
                .setFooter(ee.footertext)
        )
    }
}