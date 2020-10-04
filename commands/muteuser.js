const Discord = require("discord.js");
const bot = require('discord.js') 
const { MessageEmbed } = require("discord.js"); 
const { cache } = require('discord.js')
module.exports = {
    name: "muteusernew1", 
    async execute(message, args) { 
        if(message.member.roles.cache.has('718155609173786685') || message.member.roles.cache.has('718155663334703145')) { //ADMIN CREW + MOD CREW
            let mmember = message.mentions.members.first();
            let user = message.mentions.members.first();
            if(mmember.roles.cache.has('718155691067572345')){
                message.channel.send(`Staff Members are immune to moderation commands!`)
        }
            if(mmember.roles.cache.has('753318651871887440')){ //LESBIAN ROOM ROLE
                message.channel.bulkDelete(1);
                let lmutedrole = message.guild.roles.cache.find(r => r.name === "LR MUTED");
                let luserid = message.mentions.users.first().id
                let lreason = message.content.slice("-muteuser".length)
                mmember.roles.add(lmutedrole);
                const lmutedembed = new Discord.MessageEmbed()
                    .setTitle(`User Muted`)
                    .setDescription(`Lesbian Room Member was muted`)
                    .addField(`User`, `${user.user.username}#${user.user.discriminator}`)
                    .addField(`User ID:`, `${luserid}`)
                    .addField(`Reason:`, `${lreason}`)
                    .addField(`Muted By:`, message.author)
                    .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/updatedmuted.png?1597002459')
                    .setTimestamp()
                    .setFooter(`RedRoom Bot`, message.guild.iconURL());
                bot.channels.cache.get('752672191321210991').send(lmutedembed)
            }
            if(mmember.roles.cache.has('753315050890068019')){ //GAY ROOM ROLE
                message.channel.bulkDelete(1);
                    let gmutedrole = message.guild.roles.cache.find(r => r.name === "GR MUTED");
                    let greason = message.content.slice("-muteuser".length)
                    let guserid = message.mentions.users.first().id
                    mmember.roles.add(gmutedrole);
                    const gmutedembed = new Discord.MessageEmbed()
                        .setTitle(`User Muted`)
                        .setDescription(`Gay Room Member was muted`)
                        .addField(`User`, `${user.user.username}#${user.user.discriminator}`)
                        .addField(`User ID`, `${guserid}`)
                        .addField(`Reason:`, `${greason}`)
                        .addField(`Muted By:`, message.author)
                        .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/updatedmuted.png?1597002459')
                        .setTimestamp()
                        .setFooter(`RedRoom Bot`, message.guild.iconURL());
                    bot.channels.cache.get('752666805713240155').send(gmutedembed)
            }
            if(mmember.roles.cache.has('753318813583540284')){ //BI ROOM ROLE
                message.channel.bulkDelete(1);
                let bmutedrole = message.guild.roles.cache.find(r => r.name === "BR MUTED");
                let breason = message.content.slice("muteuser".length)
                let buserid = message.mentions.user.first().id
                mmember.roles.add(bmutedrole);
                const bmutedembed = new Discord.MessageEmbed()
                    .setTitle(`User Muted`)
                    .setDescription(`Bi Room Member was muted`)
                    .addField(`User`, `${user.user.username}#${user.user.discriminator}`)
                    .addField(`User ID`, `${buserid}`)
                    .addField(`Reason:`, `${breason}`)
                    .addField(`Muted By:`, message.author)
                    .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/updatedmuted.png?1597002459')
                    .setTimestamp()
                    .setFooter(`RedRoom Bot`, message.guild.iconURL());
                bot.channels.cache.get('752673465370411068').send(bmutedembed)
        }
        if(mmember.roles.cache.has('753318980890132610')){ //TRANS ROOM ROLE
            message.channel.bulkDelete(1);
            let tmutedrole = message.guild.roles.cache.find(r => r.name === "TR MUTED");
            let treason = message.content.slice("-muteuser".length)
            let tuserid = message.mentions.user.first().id
            mmember.roles.add(tmutedrole);
            const tmutedembed = new Discord.MessageEmbed()
                .setTitle(`User Muted`)
                .setDescription(`Trans Room Member was muted`)
                .addField(`User`, `${user.user.username}#${user.user.discriminator}`)
                .addField(`User ID`, `${tuserid}`)
                .addField(`Reason:`, treason)
                .addField(`Muted By:`, message.author)
                .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/updatedmuted.png?1597002459')
                .setTimestamp()
                .setFooter(`RedRoom Bot`, message.guild.iconURL());
            bot.channels.cache.get('752675302509117440').send(tmutedembed)
    }
        } else { //ANYONE WHO IS NOT A LEAD MOD MEMBER OR HIGHER
            message.channel.send('Only Moderation and Admin Crew members are allowed to execute this command!'); //SENDS MESSAGE WITHIN CHANNEL WHERE COMMAND WAS EXECUTED
            const unauthorized = new Discord.MessageEmbed()
                .setTitle('User Attempted to Use Command')
                .setDescription('User attempted to use command that is reserved for staff roles.')
                .addField('User', message.author.tag)
                .addField('Command',message.content)
                .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
            bot.channels.cache.get('723264488706408629').send(unauthorized); //SENDS EMBED TO COMMAND BYPASS LOG CHANNEL


        }
    }}