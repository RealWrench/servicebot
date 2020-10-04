const Discord = require("discord.js");
const bot = require('discord.js') 
const { MessageEmbed } = require("discord.js"); 
module.exports = {
    name: "serverstats", 
    async execute(message, args) {  
        if(message.member.roles.cache.has('718155609173786685')){ //ADMIN CREW ROLE
            let onlineCount = message.guild.members.cache.filter(m => m.presence.status === 'online').size
            let userCount = message.guild.memberCount;
            const serverstats = new Discord.MessageEmbed()
            .setTitle('Current Server Stats')
            .setAuthor('The Red Room (Gay 18+ NSFW)', 'https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/beta-logo.png?1598545109', 'https://discord.com')
            .setDescription('Below are current stats for this server.')
            .addField('Total Users', + userCount)
            .addField('Online Users', + onlineCount)
            .addField('Number of Roles', `${message.guild.roles.cache.size} roles`)
            .addField('Number of Emojis', `${message.guild.emojis.cache.size} emojis`)
            .setColor(0x63D2FF)
            .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/stats.png?1598544691')
            message.channel.send(serverstats);

        } else {
            message.channel.bulkDelete(1);
            message.channel.send('Only Staff Members can execute this command!')
            .then(msg => {
             msg.delete({ timeout: 5000 })
           })
           .catch(console.error)
                //The embed below is sent to mod logs when an unauthorized user attempts to execute a command they don't have access to.
            const unauthorized = new Discord.MessageEmbed()
            .setTitle('User Attempted to Use Command')
            .setDescription('User attempted to use command that is reserved for staff roles.')
            .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
            .addField('User', message.author.tag)
            .addField('Command',message.content)
            message.guild.channels.cache.get('752262073878052956').send(unauthorized);
        
} 
    }}