const Discord = require("discord.js");
const bot = require('discord.js') 
const { MessageEmbed } = require("discord.js"); 


module.exports = {
    name: "resetbot", 
    async execute(message, args) { 
            if(message.member.roles.cache.has('721835471852011590')){
                const restartembed = new Discord.MessageEmbed()
                    .setTitle(`Bot is Restarting...`)
                    .setDescription(`Bot is being restarted. All functions will be unavailable until complete.`)
                    .setColor(0xff0000)
                    .setFooter(`Red Room Bot`)
                    message.channel.send(restartembed).catch(console.error);
            } else {
                message.reply('Only Dev Team Members are allowed to execute this command!')
            }
            }}