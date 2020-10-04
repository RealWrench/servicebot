const Discord = require("discord.js");
const bot = require('discord.js') 
const { MessageEmbed } = require("discord.js"); 
const { cache } = require('discord.js')

module.exports = {
    name: "musiccmds", 
    async execute(message, args) { 
        if(message.member.roles.cache.has('718155609173786685')){ //REQUIRES ADMIN CREW ROLE
            const music1 = new Discord.MessageEmbed()
                .setTitle(`Dance Floor Commands`)
                .setDescription(`In order for these commands to work, you must be connected to <#752666368301858826> in order to listen to music.`)
                .addField(`Play Music:`, `*play [song title | url] |`)
                .addField(`Play Playlist (YouTube):`, `*playlist [keyword or youtube URL]`)
                .addField(`Pause Music:`, `*pause`)
                .addField(`Resume Music:`, `*resume`)
                .addField(`Skip to next track:`, `*skip`)
                .addField(`List all music in queue:`, `*q`)
                .addField(`Remove Song From Queue:`, `*remove [#]`)
                .addField(`Adjust Volume:`, `*volume [1-10]`)
                .setColor(0xff0000)
                .setFooter(`Music Streaming Provided By Tritan Bot`)
                message.channel.send(music1).catch(console.error);
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