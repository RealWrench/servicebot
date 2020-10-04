const Discord = require("discord.js");
const bot = require('discord.js')
const { MessageEmbed } = require("discord.js"); 
const { cache } = require('discord.js')
const client =
module.exports = {
    name: "idverify", 
    async execute(message, args) { 
        if(message.member.roles.cache.has('718155609173786685') || message.member.roles.cache.has('752689894937329784')) { //ADMIN CREW + LEAD MOD CREW
            let idverifyembed = new Discord.MessageEmbed()
                .setTitle(`Verify Via Photo ID`)
                .setDescription(`based on the photo you provided us in order to verify your age you are required to verify via a photo ID.`)
                .addField(`1. Get Photo ID ready:`, `A photo ID can include drivers license or a State or Federal Identification Card.`)
                .addField(`2. Take selfie of yourself holding up your ID.`, `Please cover up all personal information except the photo and the area where your Date of Birth is displayed.`)
                .addField(`\nSend the photo into this ticket channel to complete the verification process!`)
                message.channel.send(idverifyembed).catch(console.error)
        } else {
            message.channel.send('Only Lead Mod Crew Members or higher can execute this command!')
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