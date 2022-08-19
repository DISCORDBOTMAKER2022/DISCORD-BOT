const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'ban',
    aliases: ['bhagja'],
    category: '🚫 Administration',
    memberpermissions: ['BAN_MEMBERS'],
    cooldown: 5,
    description: 'Ban a User From Guild',
    usage: 'ban + <@user> + <reason>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        // if not a member
        if (!member) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setTitle(`**Por favor mencione a un usuario para prohibir**`)
                    .setDescription(`> Uso =  ${prefix}ban + <@user> + <reason>`)
                    .setFooter(ee.footertext)
            )
        }

        // if member role not high
        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`** Su papel no es alto para prohibir a este usuario`)
                    .setFooter(ee.footertext)
            )
        }

        let reason = args.slice(1).join(" ")

        // if not a Role
        if (!reason) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.colour)
                    .setDescription(`**Por favor da la razón **`)
                    .setFooter(ee.footertext)
            )
        }
        // add role to user
        if (member) {
            await member.ban()
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.colour)
                    .setDescription(`> <@${member.user.id}> Prohibido del gremio \n\n > Razón = \`\`${reason}\`\``)
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setFooter(`Prohibido por ${message.author.username}`)
            )
        }


    }
}