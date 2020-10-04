const Discord = require("discord.js");
const bot = require('discord.js') 
const { MessageEmbed } = require("discord.js"); 
const { cache } = require('discord.js')

module.exports = {
    name: "sayembed", 
    async execute(message, args) { 
        if(message.member.roles.cache.has('718155609173786685')){ //ADMIN CREW ROLE
            message.channel.bulkDelete(1) //DELETES THE EXECUTED COMMAND FROM THE CHANNEL
        let content = message.content.slice("-sayembed".length) //REMOVES THE PREFIX PLUS COMMAND FROM THE CONTENT PORTION OF EMBED
        let qotd = new Discord.MessageEmbed()
            .setDescription(content)
            .setColor(0xff0000)
            message.channel.send(qotd).catch(console.error); //SENDS EMBED TO CHANNEL WHERE IT WAS EXECUTED
        } else {
            message.channel.bulkDelete(1); //DELETES THE EXECUTED COMMAND FROM THE CHANNEL
            message.channel.send('Only Admin Crew Members can execute this command!')
            .then(msg => {
             msg.delete({ timeout: 5000 })
           })
           .catch(console.error)
                //The embed below is sent to mod logs when an unauthorized user attempts to execute a command they don't have access to.
            const unauthorized = new Discord.MessageEmbed()
            .setTitle('User Attempted to Use Command')
            .setDescription('User attempted to use command that is reserved for staff roles.')
            .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
            .setThumbnail(member.avatarURL)
            .addField('User', message.author.tag)
            .addField('Command',message.content)
            message.guild.channels.cache.get('752262073878052956').send(unauthorized); //SENDS EMBED TO COMMAND BYPASS CHANNEL    
        }}}