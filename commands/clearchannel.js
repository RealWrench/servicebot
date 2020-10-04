const Discord = require("discord.js");
const bot = require('discord.js')
const { MessageEmbed } = require("discord.js"); 
const { cache } = require('discord.js')
module.exports = {
    name: "clearchat", 
    async execute(message, args) { 
        if(message.member.roles.cache.has('718155691067572345')){
            let number = message.content.slice("-cleanchat".length)
            message.channel.BulkDelete(number)
            message.channel.send(`I have deleted ${number} messages from this channel`).catch(console.error)
            .then(msg => {
                msg.delete({ timeout: 30000 })
              })
              let clearembed = new Discord.MessageEmbed()
                .setTitle('Messages Deleted')
                .setDescription(`Message(s) have been deleted`)
                .addField(`Number of Messages Deleted`, number)
                .addField(`Channel`, message.channel)
                .setTimestamp()
                .setFooter(`RedRoom Bot`, message.guild.iconURL());
                message.guild.channels.cache.get('727927720540897310').send(unauthorized); //SENDS EMBED TO MESSAGES LOG CHANNEL
        } else {
            message.channel.send('Only staff are allowed to execute this command!');
            const unauthorized = new Discord.MessageEmbed()
                .setTitle('User Attempted to Use Command')
                .setDescription('User attempted to use command that is reserved for staff roles.')
                .addField('User', message.author.tag)
                .addField('Command',message.content)
                .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
            message.guild.channels.cache.get('752262073878052956').send(unauthorized); //SENDS EMBED TO COMMAND BYPASS LOG CHANNEL
        }
    }}