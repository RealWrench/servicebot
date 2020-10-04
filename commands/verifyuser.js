const Discord = require("discord.js");
const bot = require('discord.js') 
const { MessageEmbed } = require("discord.js"); 

module.exports = {
    name: "verifyuser", 
    async execute(message, args) { 
        let nouser = message.mentions.members.first();
        if (!nouser) return message.reply(`You must mention a user in order to execute this command!`)
        .then(msg => {
            msg.delete({ timeout: 5000 })
          })
          if(message.member.roles.cache.has('718155609173786685') || message.member.roles.cache.has('752689894937329784')) { //ADMIN CREW + LEAD MOD CREW

            let member = message.mentions.members.first();
            let verifyembed = new Discord.MessageEmbed()
                .setTitle('You are now been Verified!')
                .setDescription('**Thank you for verifying! You have been given the Verified Role for your Room.**\n \nYou now have access to the following features within the server: \n \n-Ability to change your username \n-Access to VIP Text, Voice, and Video Channels \n-Ability to participate in challenges (coming soon) \n-Priority Speaking in all Voice and Video Channels.')
                .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/426713-200.png?1596596212')
                .setColor(0x52FF8F);
            if(member.roles.cache.has(`752699182569095180`, `752697088483000381`, `752698389719810130`, `752699866207092807`)){
                    const alreadyverified = new Discord.MessageEmbed()
                        .setTitle(`This user is already Verified!`)
                        .setDescription(`This user is already verified! If you meant to mention another user, try again.`)
                        .setColor(0xff0000)
                        message.channel.send(alreadyverified).catch(console.error);
              }
            if(member.roles.cache.has('721901417073475694')){ //LESBIAN ROLE
                member.roles.add('752697088483000381').catch(console.error); //LESBIAN ROOM VERIFIED ROLE
                member.roles.remove('757091282962088007').catch(console.error);
                message.channel.send(verifyembed).catch(console.error);
            }if(member.roles.cache.has('721901477379178517')){ //GAY ROLE
                member.roles.add('752698389719810130').catch(console.error); //GAY ROOM VERIFIED ROLE
                member.roles.remove('757091282962088007').catch(console.error);
                message.channel.send(verifyembed).catch(console.error);
            }if(member.roles.cache.has('752699448580374559')){ //BI ROLE
                member.roles.add('752699182569095180').catch(console.error); //BI ROOM VERIFIED ROLE
                member.roles.remove('757091282962088007').catch(console.error);
                message.channel.send(verifyembed).catch(console.error);
                member.roles.remove('757091282962088007').catch(console.error);
            }if(member.roles.cache.has('752699708832481321')){ //TRANS ROLE
                member.roles.add('752699866207092807').catch(console.error); //TRANS ROOM VERIFIED ROLE
                member.roles.remove('757091282962088007').catch(console.error);
                message.channel.send(verifyembed).catch(console.error);
            }} else {
                message.channel.bulkDelete(1);
                message.channel.send('Only Moderation Crew Members or higher can execute this command!')
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
            }}
}