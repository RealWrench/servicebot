const Discord = require("discord.js");
const bot = require('discord.js') 
const { MessageEmbed } = require("discord.js"); 
const { cache } = require('discord.js')

module.exports = {
    name: "newkickuser", 
    async execute(message, args) { 
        let nkmember = message.mentions.members.first();
        if(nkmember.roles.cache.has('718155691067572345')){ //CHECKS TO SEE IF MEMBER BEING KICKED HAS STAFF ROLE
                message.channel.bulkDelete(1);
                const embed = new Discord.MessageEmbed()
                .setTitle('Error')
                .setDescription('Unable to execute command.')
                .addField('Reason', 'Staff Members are immune to moderation commands.') 
                .setColor(0xffde02)
                .setTimestamp()                                
            message.channel.send(embed); //SENDS EMBED TO CHANNEL WHERE COMMAND WAS EXECUTED
        }
        if(message.member.roles.cache.has('718155609173786685') || message.member.roles.cache.has('718155663334703145')) {
            message.channel.bulkDelete(1); //DELETES EXECUTED COMMAND FROM THE CHANNEL
            let user = message.mentions.members.first();
            let reason = message.content //THE REASON THE USER IS BEING KICKED
            let member = message.mentions.members.first();
        if (user) {
            let member = message.guild.member(user)};
        if (member) {
            member.kick(reason) //KICKS USER AND LISTS REASON
                .then(() => {
                message.reply(`Has kicked ${user} from the server.`);
                    })
                .catch(err => {
                    message.reply('I was unable to kick the member');
                    console.error(err);
                      });
            const embed = new Discord.MessageEmbed()
                .setTitle('Member Kicked')
                .setDescription(`${user.user.username}#${user.user.discriminator}`)
                .addField('Executed by', message.author.tag)
                .addField('Reasons', reason)
                .setColor(0xffde02)
                .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/kick-updated.png?1597002846')
                .setTimestamp()                                  
            bot.channels.cache.get('752261944790089778').send(embed).catch(console.error); //SENDS EMBED TO LOG CHANNEL                  
        } else {                     
            message.channel.bulkDelete(1); //DELETES EXECUTED COMMAND FROM CHANNEL
            const embed = new Discord.MessageEmbed()
                .setTitle('You do not have the proper permissions to use this command!')
                .setDescription('You have attempted to use a command that you do not have access too. If this is a mistake contact a server administrator.')
                .setColor(0xFF0000)
            message.channel.send(embed); //SENDS EMBED TO CHANNEL WHERE COMMAND WAS EXECUTED
            const unauthorized = new Discord.MessageEmbed()
                .setTitle('User Attempted to Use Command')
                .setDescription('User attempted to use command that is reserved for staff roles.')
                .addField('User', message.author.tag)
                .addField('Command',message.content)
                .setTimestamp()
            bot.channels.cache.get('752262073878052956').send(unauthorized); //SENDS EMBED TO COMMAND BYPASS LOG
                }}      
}}