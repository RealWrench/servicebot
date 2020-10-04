const Discord = require("discord.js");
const bot = require('discord.js')
const { MessageEmbed } = require("discord.js"); 
const { cache } = require('discord.js')
module.exports = {
    name: "crashmessage", 
    async execute(message, args) {
        if(message.member.roles.cache.has('718155691067572345')){ //CHECKS TO SEE IF USER HAS STAFF ROLE
            message.guild.channels.cache.get('723264354296004779').send(`<@&718155691067572345>`)    
            const crashembed = new Discord.MessageEmbed()
                .setTitle(`The Red Room Bot has Crashed!`)
                .setDescription(`Red Room Bot suffered fatal crash. Bot is unavailable until it is manually restarted! If no Red Room Bot Dev Team member is online ping them!!`)
                .setTimestamp()
                .setThumbnail(`https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/1653034-200.png?1601609340`)
                .setFooter(`RedRoom Bot`, message.guild.iconURL());
                message.guild.channels.cache.get('723264354296004779').send(crashembed);
        } else {
            message.channel.send('Only staff are allowed to execute this command!');
            const unauthorized = new Discord.MessageEmbed()
                .setTitle('User Attempted to Use Command')
                .setDescription('User attempted to use command that is reserved for staff roles.')
                .addField('User', message.author.tag)
                .addField('Command',message.content)
                .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
            bot.channels.fetch('752262073878052956').send(unauthorized); //SENDS EMBED TO COMMAND BYPASS LOG CHANNEL

        }
    }}