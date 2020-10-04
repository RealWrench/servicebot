const Discord = require("discord.js");
const bot = require('discord.js') 
const { MessageEmbed } = require("discord.js"); 
const { cache } = require('discord.js')

module.exports = {
    name: "ageverification", 
    async execute(message, args) { 
        if(message.member.roles.cache.has('718155691067572345')){ //CHECKS TO SEE IF USER HAS STAFF ROLE
            message.channel.send(' <@&718155663334703145> <@&718155609173786685>') //SENDS MESSAGE THAT PINGS MOD CREW AND ADMIN CREW
            const newverifyembed = new Discord.MessageEmbed()
                .setTitle('How to Verify Your Age:')
                .setDescription(`** verify your age choose from one of the options below. Once the required steps are completes a member of <@&718155691067572345> will help you finish the verification process!** `)
                .addField('Partner Server:', `if you are verified in one of our <#726076505158975549> servers simply send a screenshot showing your required role within that server`)
                .addField('Selfie with paper', `Send a selfie of yourself (showing your entire face) holding a piece of paper with your discord username, todays date, and "RedRoom" written on it.`)
                .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/426713-200.png?1596596212')
                 .setColor(0x52FF8F)
                 .setFooter(`RedRoom Bot`, message.guild.iconURL());
            message.channel.send(newverifyembed); //SENDS EMBED THAT HAS DIRECTIONS ON HOW TO VERIFY AUTOMATICALLY INTO THE TICKET
        } else { //ANYONE THAT DOESNT HAVE STAFF ROLE
            message.channel.send('Only Modertaion Crew Members or higher can execute this command!')
            .then(msg => {
             msg.delete({ timeout: 5000 })
           })
           .catch(console.error)
            const unauthorized = new Discord.MessageEmbed()
                .setTitle('User Attempted to Use Command')
                .setDescription('User attempted to use command that is reserved for staff roles.')
                .addField('User', message.author.tag)
                .addField('Command',message.content)
                .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
            message.guild.channels.cache.get('752262073878052956').send(unauthorized); //SENDS EMBED TO COMMAND BYPASS LOG CHANNEL
        }
    }}