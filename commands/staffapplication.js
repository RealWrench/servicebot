const Discord = require("discord.js");
const bot = require('discord.js') 
const { MessageEmbed } = require("discord.js"); 


module.exports = {
    name: "staffapplicationnew1", 
    async execute(message, args) { 
            if(message.member.roles.cache.has('718155691067572345')){
                let staffapplicationembed = new Discord.MessageEmbed()
                    .setTitle(`Staff Application`)
                    .setDescription('**To begin your application please answer these questions and a member of <@&718155691067572345> will be with you once you are finished!** \n \nPlease answer the following questions: \n1. Where did you hear about us? \n2. What admin/mod experience do you have? (list any servers and an invite link to join) \n3. What position are you applying for? \n4. Tell us about yourself! \n5. What days/times are you online? \n6. Are you comfortable with starting conversations and encouraging others to do so? \nUpon answering the questions please give us time to look over your application!')
                    .setColor(0xff0000)
                message.channel.send(staffapplicationembed).catch(console.error)
                } else {
                    message.channel.bulkDelete(1);
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