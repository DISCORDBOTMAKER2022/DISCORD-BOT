const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'addrole',
    aliases: ['giverole'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_ROLES'],
    cooldown: 5,
    description: 'Add role a user',
    usage: 'addrole + <@user> + <@role>',
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
                    .setTitle(`**Por favor mencione a un usuario para dar un rol**`)
                    .setDescription(`> Uso =  ${prefix}addrole + <@user> + <@role>`)
                    .setFooter(ee.footertext)
            )
        }

        // if member role not high
        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`** Su papel no es alto para dar papel a este usuario`)
                    .setFooter(ee.footertext)
            )
        }

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

        // if not a Role
        if (!role) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.colour)
                    .setDescription(`**Mencione un rol **`)
                    .setFooter(ee.footertext)
            )
        }

        // if (role.managed) {
        //     return message.channel.send(
        //         new MessageEmbed()
        //             .setColor(ee.color)
        //             .setDescription(`** Cannot add That Role to This User **`)
        //     )
        // }

        // // if role is high

        // if (message.guild.me.roles.highest.comparePositionTo(role) <= 0) {
        //     new MessageEmbed()
        //         .setColor(ee.colour)
        //         .setDescription(`**Role Is Currently Higher Than Me Therefore Cannot Add It To The User!**`)
        //         .setFooter(ee.footertext)
        // }


        // add role to user
        if (!member.roles.cache.has(role.id)) {
            await member.roles.add(role.id);
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.colour)
                    .setDescription(`${role} Se ha agregado el rol a <@${member.user.id}>`)
                    .setFooter(`Rol agregado por ${message.author.username}`)
            )
        }


    }
}