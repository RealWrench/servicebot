const Discord = require("discord.js");
const bot = require('discord.js') 
const { MessageEmbed } = require("discord.js");
const { cache } = require('discord.js')

module.exports = {
    name: "userstats", 
    async execute(message, args) { 
        if(message.member.roles.cache.has('718155609173786685') || message.member.roles.cache.has('718155663334703145')) { //ADMIN CREW + MOD CREW
            let member = message.mentions.members.first();
            let user = message.mentions.members.first();
            const userinfoembed = new Discord.MessageEmbed()
            .setAuthor(member.username, member.avatarURL)
            .addField('Username',`${user.user.username}#${user.user.discriminator}`)
            .addField('ID', member.user.id)
            .addField('Account Created:', member.user.createdAt)
            .addField('Joined Server:', user.joinedAt)
            .addField('Highest Role', user.roles.highest)
            .setThumbnail(`Requested By `, `${message.author.username}`)
            .setColor(0xff0000)
            message.channel.send(userinfoembed)
        } else {
            message.channel.send('Only Lead Mod Crew Members or higher can execute this command!')
            .then(msg => {
             msg.delete({ timeout: 5000 })
           })
           .catch(console.error)
            const idverifyunauthorized = new Discord.MessageEmbed()
                .setTitle('User Attempted to Use Command')
                .setDescription('User attempted to use command that is reserved for staff roles.')
                .addField('User', message.author.tag)
                .addField('Command',message.content)
                .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
        message.guild.channels.cache.get('752262073878052956').send(idverifyunauthorized).catch(console.error); //SENDS EMBED TO COMMAND BYPASS LOG CHANNEL



        }
    }}