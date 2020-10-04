const Discord = require("discord.js");
const bot = require('discord.js') 
const { MessageEmbed } = require("discord.js"); 

module.exports = {
    name: "gatekeeper", 
    async execute(message, args) {  
        if(message.member.roles.cache.has('718155691067572345')){ //CHECKS TO SEE IF USER HAS STAFF ROLE
            const gembed = new Discord.MessageEmbed()
            .setTitle('Gatekeeper')
            .setDescription('In order to acces the server you must agree to the rules above. React to this message with <:redcheck:755210641937137705> to state you have read and understand the rules of The Red Room.')
            .setColor(0xFF0000)
            message.channel.send(gembed).then(embedMessage => {
                embedMessage.react("755210641937137705")
            })
        } else {
            message.channel.bulkDelete(1); //DELETES THE EXECUTED COMMAND FROM THE CHANNEL
            message.channel.send('Only Admib Crew Members can execute this command!')
            .then(msg => {
             msg.delete({ timeout: 5000 })
           })
           .catch(console.error)
            const unauthorized = new Discord.MessageEmbed()
                .setTitle('User Attempted to Use Command')
                .setDescription('User attempted to use command that is reserved for staff roles.')
                .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
                .setThumbnail(member.avatarURL)
                .addField('User', message.author.tag)
                .addField('Command',message.content)
                message.guild.channels.cache.get('752262073878052956').send(unauthorized); //SENDS EMBED TO COMMAND BYPASS LOG CHANNEL
        }   
    }}