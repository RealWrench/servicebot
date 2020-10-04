
//DESCRIPTION: This command responds with the Bot's discord API Responce time in ms

const Discord = require("discord.js");
const bot = require('discord.js') 
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "pingbot", 
  async execute(message, args) {  
    if(message.member.roles.cache.has('718155609173786685') || message.member.roles.cache.has('752689894937329784')) { //ADMIN CREW + LEAD MOD CREW
      let ping = Date.now() - message.createdTimestamp;
      let pingembed = new Discord.MessageEmbed()
      .setTitle(`Discord API Bot Response Time`)
      .setDescription("🏓 Pong! `" + `${ping}` + " ms` response time.")
      .setColor(0xff0000)
    message.channel.send(pingembed).catch(console.error);

  } else {
       message.channel.send('Only Staff Members can execute this command!')
       .then(msg => {
        msg.delete({ timeout: 5000 })
      })
      .catch(console.error)
      //EMBED FOR UNAUTHORIZED LOG
      const unauthorized = new Discord.MessageEmbed()
          .setTitle('User Attempted to Use Command')
          .setDescription('User attempted to use command that is reserved for staff roles.')
          .addField('User', message.author.tag)
          .addField('Command',message.content)
          .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
          message.guild.channels.cache.get('752262073878052956').send(unauthorized)
  }
  }}