const Discord = require("discord.js");
const bot = require('discord.js')
const { MessageEmbed } = require("discord.js"); 
const { cache } = require('discord.js')
module.exports = {
    name: "announce", 
    async execute(message, args) {
        if(message.member.roles.cache.has('718155609173786685') || message.member.roles.cache.has('752689894937329784')) { //ADMIN CREW + LEAD MOD CREW
            message.guild.channels.cache.get(args[0].replace('<#','').replace('>','')).send(`<@&725794668394053662> <@&723222998181609643>`);
            let announcement = args.slice(1).join(" ");
            const announcementembed = new Discord.MessageEmbed()
                .setTitle(`Announcement`)
                .setDescription(`${announcement}`)
                .setColor(0xFF0000)
                .setTimestamp()
                .setFooter(`Posted by ${message.author.tag}`, message.author.displayAvatarURL())
                message.guild.channels.cache.get(args[0].replace('<#','').replace('>','')).send(announcementembed);

        } else {
            message.reply('Only members of the Admin Crew are allowed to execute this command!')
            .then(msg => {
                msg.delete({ timeout: 5000 })
              })
              .catch(console.error)
            const unauthorized = new Discord.MessageEmbed()
                .setTitle('User(s) Attempted to Use Command')
                .setDescription('User attempted to use command that is reserved for staff roles.')
                .addField('User', message.author.tag)
                .addField('Command',message.content)
                .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
            message.guild.channels.cache.get('752262073878052956').send(unauthorized); //SENDS EMBED TO COMMAND BYPASS LOG CHANNEL

        }
    }}