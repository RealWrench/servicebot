const Discord = require("discord.js");
const bot = require('discord.js') 
const { MessageEmbed } = require("discord.js"); 
const { cache } = require('discord.js')

module.exports = {
    name: "mutedfaq", 
    async execute(message, args) { 
        if(message.member.roles.cache.has('718155691067572345')){
            const mutedembed = new Discord.MessageEmbed()
                .setTitle(`You Are Muted!`)
                .setDescription(`Please wait while a member of the Admin Crew looks into your infraction. A ticket will soon be opened to discuss your infraction. Hold Tight!`)
                .setColor(0xff0000)
                message.channel.send(mutedembed).catch(console.error);
        } else {
            message.channel.bulkDelete(1); //DELETES THE EXECUTED COMMAND FROM THE CHANNEL
            message.channel.send('Only Admin Crew Members can execute this command!')
            .then(msg => {
             msg.delete({ timeout: 5000 })
           })
           .catch(console.error)
            const unauthorized = new Discord.MessageEmbed()
                .setTitle('User(s) Attempted to Use Command')
                .setDescription('User attempted to use command that is reserved for staff roles.')
                .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
                .setThumbnail(member.avatarURL)
                .addField('User', message.author.tag)
                .addField('Command',message.content)
                message.guild.channels.cache.get('752262073878052956').send(unauthorized); //SENDS EMBED TO COMMAND BYPASS LOG CHANNEL
        }
        }}
