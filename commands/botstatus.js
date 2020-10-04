const Discord = require("discord.js");
const bot = require('discord.js')
const { MessageEmbed } = require("discord.js"); 
const { cache } = require('discord.js')
module.exports = {
    name: "botstatus", 
    async execute(message, args) {
        if(message.member.roles.cache.has('718155609173786685')){ //CHECKS TO SEE IF USER HAS ADMIN CREW ROLE
            let ping = Date.now() - message.createdTimestamp;
            const botstatusembed = new Discord.MessageEmbed()
                .setTitle(`Red Room Bot Status`)
                .setDescription(`Below is the current status of Red Room Bot.`)
                .addField(`Version:`, `3.1.0`)
                .addField(`API Response Time:`, `${ping}`)
                .addField(`Server Count:`, `2`)
                .addField(`Developed By:`, `Wrench#0001`)
                .setFooter(`RedRoom Bot`, message.guild.iconURL())
                .setColor(0xff0000)
                message.channel.send(botstatusembed).catch(console.error);

        } else {
            message.channel.send('Only Admin Crew Members or higher can execute this command!')
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