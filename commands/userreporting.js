const Discord = require("discord.js");
const bot = require('discord.js') 
const { MessageEmbed } = require("discord.js");
const { cache } = require('discord.js')

module.exports = {
    name: "userreportingnew1", 
    async execute(message, args) { 
            if(message.member.roles.cache.has('718155691067572345')){
                let userreportingembed =  new Discord.MessageEmbed()
                .setTitle('Reporting User(s) Ticket')
                .setDescription(`**A Member of <@&718155691067572345> will be with you once we receive the following information!**`)
                .addField(`User(s) Information:`, `Please send the FULL Discord username of the user(s) that you are reporting. Please include the four digit set of numbers that are at the end of their username.`)
                .addField(`Report:`, `Provide information as to why you are submitting the report. Feel free to include as many details as possible that you think would be useful.`)
                .addField(`Evidence:`, `If possible include screenshots, screen recordings, or other evidence to help us resolve this.`)
                .setColor(0xff0000)
                .setFooter(`RedRoom Bot`, message.guild.iconURL());
                message.channel.send(userreportingembed).catch(console.error);
            } else {
                message.channel.send('You are not allowed to execute this command!');
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