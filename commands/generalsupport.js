const Discord = require("discord.js");
const bot = require('discord.js') 
const { MessageEmbed } = require("discord.js");
const { cache } = require('discord.js')

module.exports = {
    name: "generalsupportnew1", 
    async execute(message, args) { 
        if(message.member.roles.cache.has('718155691067572345')){
            let generalsupportembed = new Discord.MessageEmbed()
                .setTitle(`General Support Ticket:`)
                .setDescription(`**Thanks for reaching out to us! A <@&718155691067572345> will be with you once the following steps are completed!** `)
                .addField(`Brief Explanation:`, `Please write a short explanation detailing what issue you are experiencing within the server.`)
                .addField(`Screenshots:`, `Please send any screenshots of the issue you are experiencing. This can include screen recordings.`)
                .setColor(0xff0000)
                .setFooter(`RedRoom Bot`, message.guild.iconURL());
                message.channel.send(generalsupportembed)
   } else {
       message.channel.BulkDelete(1);
    message.channel.send('Only Modertaion Crew Members or higher can execute this command!')
    .then(msg => {
     msg.delete({ timeout: 5000 })
   })
   .catch(console.error)
           //The embed below is sent to mod logs when an unauthorized user attempts to execute a command they don't have access to.
       const unauthorized = new Discord.MessageEmbed()
           .setTitle('User Attempted to Use Command')
           .setDescription('User attempted to use command that is reserved for staff roles.')
           .addField('User', message.author.tag)
           .addField('Command',message.content)
           .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
           message.guild.channels.cache.get('752262073878052956').send(unauthorized);
   }

}}