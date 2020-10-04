const Discord = require("discord.js");
const bot = require('discord.js') 
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "qotd", 
  async execute(message, args) {  
    if(message.member.roles.cache.has('718155609173786685') || message.member.roles.cache.has('752689894937329784')) { //ADMIN CREW + LEAD MOD CREW
    message.channel.bulkDelete(1) //DELETES THE EXECUTED COMMAND FROM THE CHANNEL
    let content = message.content.slice("-qotd".length) //REMOVES THE PREFIX PLUS COMMAND FROM THE CONTENT PORTION OF EMBED
    message.channel.send(`<@&723223078678823033> <@&725794668394053662>`)
    let qotd = new Discord.MessageEmbed()
        .setTitle(`Today's Question of the Day:`)
        .setDescription(content)
        .setColor(0xff0000)
        message.channel.send(qotd).catch(console.error) //SENDS EMBED TO CHANNEL WHERE IT WAS EXECUTED
    } else {
        message.channel.bulkDelete(1); //DELETES THE EXECUTED COMMAND FROM THE CHANNEL
        const embed = new Discord.MessageEmbed()
            .setTitle('You do not have the proper permissions to use this command!')
            .setDescription('You have attempted to use a command that you do not have access too. If this is a mistake contact a server administrator.')
            .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/thor-hammer.png?1596130284')
            .setColor(0xFF0000)
        message.channel.send(embed); //SENDS EMBED TO CHANNEL IN WHICH COMMAND WAS EXECUTED IN
            //The embed below is sent to mod logs when an unauthorized user attempts to execute a command they don't have access to.
        const unauthorized = new Discord.MessageEmbed()
        .setTitle('User Attempted to Use Command')
        .setDescription('User attempted to use command that is reserved for staff roles.')
        .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
        .addField('User', message.author.tag)
        .addField('Command',message.content)
         bot.channels.cache.get('723264488706408629').send(unauthorized); //SENDS EMBED TO COMMAND BYPASS CHANNEL    
    }
  }}