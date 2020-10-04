const {
    Client,
    Collection,
} = require("discord.js");
const Discord = require("discord.js")
const {
    readdirSync
} = require("fs");
const db = require('quick.db')
const {
    join
} = require("path");
const client = new Client({
    disableMentions: "everyone"
});
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[]\]/g, "\$&");

const bot = client
client.commands = new Collection()
const cooldowns = new Collection()
const PREFIX = '-';

process.on("unhandledRejection", error => console.error("Promise rejection:", error));

const DM_CHANNEL = '752282380504662179'
const CONTROL_CHANNEL = ('730942006326722610'); // Used for the On Ready Message

bot.on('disconnect', event => {
    let crashembed = new Discord.MessageEmbed
        .setTitle(`Red Room Bot has Crashed!`)
        .setDescription(`Red Room Bot has disconnected from Discord API`)
        .addField(`Reason:`, `${event.reason}`)
        client.channels.cache.get('731135846543130654').send(crashembed).catch(console.error);
});


bot.on('ready', () => {

let apiembed = new Discord.MessageEmbed()
    .setTitle(`Discord API Message`)
    .setDescription(`Red Room Bot has reconnected to Discord API!`)
    .setColor(0xff0000)
    client.channels.cache.get('731135846543130654').send(apiembed).catch(console.error);
/**
 * Import all commands -- Command Handler
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
} 

	console.log('RedRoom Bot is online via RR Servers!');
	bot.user.setActivity('Server | Beep Boop!', {
		type: 'WATCHING'
})})
bot.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

//LOGS NEW USERS IN USER JOIN LOG CHANNEL
client.on('guildMemberAdd', member => {
    let memberid = member.id
    const newuserembed = new Discord.MessageEmbed()
        .setTitle(`User Joined Server`)
        .addField(`Username:`, `${member.user.username}#${member.user.discriminator}`)
        .addField(`User ID:`, `${memberid}`)
        .setTimestamp()
        .setColor(0x00CC00)
        .setThumbnail(`https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/adduser.png?1597239340`)
        client.channels.cache.get(`727910398254252072`).send(newuserembed).catch(console.error);
});

//LOGS WHEN USER LEAVES THE SERVER
client.on('guildMemberRemove', member => {
    let memberid = member.id
    const leftuserembed = new Discord.MessageEmbed()
        .setTitle(`User Left Server`)
        .addField(`Username:`, `${member.user.username}#${member.user.discriminator}`)
        .addField(`User ID:`, `${memberid}`)
        .setTimestamp()
        .setColor(0xFF000)
        .setThumbnail(`https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/removeuser.png?1597241394`)
        client.channels.cache.get(`727925509119541328`).send(leftuserembed).catch(console.error);
});
//BOT RECIEVED DM RESPONSE
client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') {
        let embedStaff = new Discord.MessageEmbed()
            .setTitle("DM Received:")
            .addField("Author:", "<@" + message.author.id + "> (" + message.author.tag + ")", false)
            .addField("Message:", message.content, false)
            .setFooter(`Sent by ${message.author.tag} | Reply? *dm @username message`, message.author.displayAvatarURL())
            .setTimestamp()
            .setColor(0xff0000);
        client.channels.cache.get('731135846543130654').send(embedStaff).catch(console.error);
        console.log(message.author.tag + " " + message.content)
        let dmEmbed = new Discord.MessageEmbed()
            .setTitle("Hi! 👋")
            .setDescription(`Beep Boop! I can't respond to DM'S. If you need to get in touch with us open a ticket within <#752282380504662179>.`)
            .setFooter(`Message sent by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()
            .setColor(0xff0000);
        message.author.send(dmEmbed).catch(console.error);
    }
});

bot.on('message', async message => {
    if (message.mentions.users.has(client.user.id) && !message.author.bot) {
        let replies = ["I'm a busy bot. You think I have time to talk? The answer is no...", "Don't ping me, I'm watching Netflix...", "Just like in Among Us, please let me finish my tasks..."];
        let random = Math.floor(Math.random() * replies.length);
        message.channel.bulkDelete(1);
        message.reply(replies[random])
        .then(msg => {
            msg.delete({ timeout: 5000 })
        })
      };
})
//COMMAND HANDLING
bot.on('message', async message => {
    if (!message.guild) return;
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command =
        client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    command.execute(message, args);
    message.react("759838715651948565")
	if (message.channel.type == 'dm') {
		let embedStaff = new Discord.MessageEmbed()
			.setTitle("DM Received:")
			.addField("Author:", "<@" + message.author.id + "> (" + message.author.tag + ")", false)
			.addField("Message:", message.content, false)
			.setFooter(`Sent by ${message.author.tag} | Reply? -dm @username message`, message.author.displayAvatarURL())
			.setTimestamp()
			.setColor("#a83262");
		client.channels.cache.get(DM_CHANNEL).send(embedStaff).catch(console.error);
		console.log(message.author.tag + " " + message.content)
		let dmEmbed = new Discord.MessageEmbed()
			.setTitle("Hi! 👋")
			.setDescription(`Beep Boop! I can't respond to Direct Messages. To get in touch with a member of staff open a support ticket inside of <#723250192354377808>`)
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp()
			.setColor("#a83262");
		message.author.send(dmEmbed).catch(console.error);
	}
});

//Defining constants
const guildID = ("718155434883678268");
const totalUsersID = ("752289458371690556");
const memberCountID = ("752291037657038950");
const botCountID = ("752364419039887540");
const channelCountID = ("752364522475356172");
const roleCountID = ('752364547855351858');

bot.on('message', message=>{
    

let argues = message.content.substring(PREFIX.length).split(" ");
    

switch(argues[0]){

        case 'dm':
            if(message.member.roles.cache.has('745640145025499186')){
                mentiondm = message.mentions.users.first();
                let member = message.mentions.members.first();
                let mention = message.mentions.members.first();
                message.channel.bulkDelete(1);
                if(!message.member.roles.cache.some(role => role.name === "Owner")) return message.channel.send('Beep Boing: This command is way too powerful for you to use!');
                if(mentiondm == null) return message.reply('Beep Boing: No user to send message to!');
                mentionMessage = message.content.slice(3);
                mention.send(mentionMessage).catch(bot.channels.cache.get('723264488706408629').send('Sending Message Resulted in an Error!'));           
                console.log('Message Sent!')
                } else {
                    const embed = new Discord.MessageEmbed()
                        .setTitle('You do not have the proper permissions to use this command!')
                        .setDescription('You have attempted to use a command that you do not have access too. If this is a mistake contact a server administrator.')
                        .setColor(0xFF0000)
                    message.channel.send(embed).catch(console.error);
                        //The embed below is sent to mod logs when an unauthorized user attempts to execute a command they don't have access to.
                    const unauthorized = new Discord.MessageEmbed()
                        .setTitle('User Attempted to Use Command')
                        .setDescription('User attempted to use command that is reserved for staff roles.')
                        .addField('User', message.author.tag)
                        .addField('Command',message.content)
                        .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
                        bot.channels.cache.get('752262073878052956').send(unauthorized).catch(console.error);
                        
                }
        break; 
        case 'escalate':
            if(message.member.roles.cache.has('718155691067572345')){
                message.channel.bulkDelete(1);
                message.channel.send('This ticket is being escalated to our <@&718155609173786685> for further assistance. Please wait for a member of the Admin Team to assist you. Hold tight!')
       } else {
           message.channel.send('Only staff are allowed to execute this command!');
               //The embed below is sent to mod logs when an unauthorized user attempts to execute a command they don't have access to.
           const unauthorized = new Discord.MessageEmbed()
               .setTitle('User Attempted to Use Command')
               .setDescription('User attempted to use command that is reserved for staff roles.')
               .addField('User', message.author.tag)
               .addField('Command',message.content)
               .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
               bot.channels.cache.get('752262073878052956').send(unauthorized);
                }
        break; 
        case 'verify':
                if(message.member.roles.cache.has('718155691067572345')){
                    let role = message.guild.roles.cache.find(r => r.name === "Verified Member");
                    let vcount = message.guild.roles.cache.get('721835947033100378').members.size
                    let member = message.mentions.members.first();
                    let reason = message.content.split(" ");
                    let user = message.mentions.members.first();
                    const embed = new Discord.MessageEmbed()
                        .setTitle('You are now Verified!')
                        .setDescription('**Thank you for verifying! You have been given the <@&721835947033100378> Role**\n \nYou now have access to the following features within the server: \n \n-Ability to change your username \n-Access to VIP Text, Voice, and Video Channels \n-Ability to participate in challenges (coming soon) \n-Priority Speaking in all Voice and Video Channels.')
                        .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/426713-200.png?1596596212')
                        .setColor(0x52FF8F)
                    message.channel.send(embed);
                    member.roles.add(role).catch(console.error)
                    bot.channels.cache.get('752635381316452422').setName(`Verified Users: ${vcount}`).catch(console.error);
                    const verifyembed = new Discord.MessageEmbed()
                        .setTitle('Users Age Verified')
                        .setDescription(`${user.user.username}#${user.user.discriminator}`)
                        .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/426713-200.png?1596596212')
                        .setFooter(`Verified by ${message.author.tag}`, message.author.displayAvatarURL())
                        .setTimestamp()
                        .setColor(0x52FF8F)
                        bot.channels.cache.get('752261381880807464').send(verifyembed);
                        mentiondm = message.mentions.users.first();

                } else {
                    message.channel.bulkDelete(1);
                    const embed = new Discord.MessageEmbed()
                        .setTitle('You do not have the proper permissions to use this command!')
                        .setDescription('You have attempted to use a command that you do not have access too. If this is a mistake contact a server administrator.')
                        .setColor(0xFF0000)
                    message.channel.send(embed);
                        //The embed below is sent to mod logs when an unauthorized user attempts to execute a command they don't have access to.
                    const unauthorized = new Discord.MessageEmbed()
                        .setTitle('User Attempted to Use Command')
                        .setDescription('User attempted to use command that is reserved for staff roles.')
                        .addField('User', message.author.tag)
                        .addField('Command',message.content)
                        bot.channels.cache.get('752262073878052956').send(unauthorized);
                    }
        break;
        case 'testmuteuser':
            if(message.member.roles.cache.has('718155663334703145')){
                message.channel.bulkDelete(1);
                let role = message.guild.roles.cache.find(r => r.name === "Muted");
                    let user = message.mentions.members.first();
                    let usermsg = message.content.split(' ');
                    let reason = message.content;
                    if (!user) return message.reply('I need a user mention.');
                    if (!reason) return message.reply('please specify a reason to mute this member.')
                    user.roles.add(role);
                    const embed = new Discord.MessageEmbed()
                        .setTitle('User Muted')
                        .setDescription(`${user.user.username}#${user.user.discriminator}`)
                        .addField('Executed by', message.author.tag)
                        .addField('Reasons', reason)
                        .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/updatedmuted.png?1597002459')
                        .setTimestamp()
                        .setColor(0xFFA500)
                        bot.channels.cache.get('752261967330410627').send(embed);
                        mentiondm = message.mentions.users.first(); 
                        mentiondm.send('You have been muted in BoyToy for the following reason\n \n' + usermsg.slice(0).join(' ')+ '\n \nPlease read the statement inside of <#725838937175621772> on how to become unmuted. Once you complete the steps ping a memebr of staff inside of <#725838978418475118>')
                    } else {                
                        if(message.member.roles.cache.has('718155609173786685')){
                            message.channel.bulkDelete(1);
                            let role = message.guild.roles.cache.find(r => r.name === "Muted");
                                let user = message.mentions.members.first();
                                let disc = user.discriminator
                                let uname = message.user
                                let reason = message.content.slice("-muteuser".length)
                                user.roles.add(role);
                                const embed = new Discord.MessageEmbed()
                                    .setTitle('User Muted')
                                    .setDescription(`${user.user.username}#${user.user.discriminator}`)
                                    .addField('Executed by', message.author.tag)
                                    .addField('Reasons', reason)
                                    .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/updatedmuted.png?1597002459')
                                    .setTimestamp()
                                    .setColor(0xFFA500)
                                    bot.channels.cache.get('752261967330410627').send(embed);
                                    mentiondm = message.mentions.users.first(); 
                                    mentiondm.send('You have been muted in BoyToy for the following reason\n \n'  +reason+ '\n \nPlease read the statement inside of <#725838937175621772> on how to become unmuted. Once you complete the steps ping a memebr of staff inside of <#725838978418475118>')
                        } else {
                                message.channel.bulkDelete(1);
                        const embed = new Discord.MessageEmbed()
                            .setTitle('You do not have the proper permissions to use this command!')
                            .setDescription('You have attempted to use a command that you do not have access too. If this is a mistake contact a server administrator.')
                            .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/thor-hammer.png?1596130284')
                            .setColor(0xFF0000)
                        message.channel.send(embed);
                            //The embed below is sent to mod logs when an unauthorized user attempts to execute a command they don't have access to.
                        const unauthorized = new Discord.MessageEmbed()
                        .setTitle('User Attempted to Use Command')
                        .setDescription('User attempted to use command that is reserved for staff roles.')
                        .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
                        .addField('User', message.author.tag)
                        .addField('Command',message.content)
                         bot.channels.cache.get('752262073878052956').send(unauthorized);
                     }}
            break;
        case 'muteuser':
            let nouser = message.mentions.members.first();
            if (!nouser) return message.reply(`You must mention a user in order to execute this command!`)
            .then(msg => {
                msg.delete({ timeout: 5000 })
              })
            if(message.member.roles.cache.has('718155663334703145')){
                message.channel.bulkDelete(1);
                let role = message.guild.roles.cache.find(r => r.name === "Muted");
                    let user = message.mentions.members.first();
                    let usermsg = message.content.split(' ');
                    let reason = message.content;
                    if (!reason) return message.channel.send(`You must provide a reason for this command`);
                    user.roles.add(role);
                    const embed = new Discord.MessageEmbed()
                        .setTitle('User Muted')
                        .setDescription(`${user.user.username}#${user.user.discriminator}`)
                        .addField('Executed by', message.author.tag)
                        .addField('Reasons', reason)
                        .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/updatedmuted.png?1597002459')
                        .setTimestamp()
                        .setColor(0xFFA500)
                        bot.channels.cache.get('752261967330410627').send(embed);
                        mentiondm = message.mentions.users.first(); 
                        mentiondm.send('You have been muted in BoyToy for the following reason\n \n' + usermsg.slice(0).join(' ')+ '\n \nPlease read the statement inside of <#725838937175621772> on how to become unmuted. Once you complete the steps ping a memebr of staff inside of <#725838978418475118>')
                    } else {                
                        if(message.member.roles.cache.has('718155609173786685')){
                            message.channel.bulkDelete(1);
                            let role = message.guild.roles.cache.find(r => r.name === "Muted");
                                let user = message.mentions.members.first();
                                let disc = user.discriminator
                                let uname = message.user
                                let reason = message.content.slice("-muteuser".length)
                                user.roles.add(role);
                                const embed = new Discord.MessageEmbed()
                                    .setTitle('User Muted')
                                    .setDescription(`${user.user.username}#${user.user.discriminator}`)
                                    .addField('Executed by', message.author.tag)
                                    .addField('Reasons', reason)
                                    .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/updatedmuted.png?1597002459')
                                    .setTimestamp()
                                    .setColor(0xFFA500)
                                    bot.channels.cache.get('752261967330410627').send(embed);
                                    mentiondm = message.mentions.users.first(); 
                                    mentiondm.send('You have been muted in BoyToy for the following reason\n \n'  +reason+ '\n \nPlease read the statement inside of <#725838937175621772> on how to become unmuted. Once you complete the steps ping a memebr of staff inside of <#725838978418475118>')
                        } else {
                                message.channel.bulkDelete(1);
                        const embed = new Discord.MessageEmbed()
                            .setTitle('You do not have the proper permissions to use this command!')
                            .setDescription('You have attempted to use a command that you do not have access too. If this is a mistake contact a server administrator.')
                            .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/thor-hammer.png?1596130284')
                            .setColor(0xFF0000)
                        message.channel.send(embed);
                            //The embed below is sent to mod logs when an unauthorized user attempts to execute a command they don't have access to.
                        const unauthorized = new Discord.MessageEmbed()
                        .setTitle('User Attempted to Use Command')
                        .setDescription('User attempted to use command that is reserved for staff roles.')
                        .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
                        .addField('User', message.author.tag)
                        .addField('Command',message.content)
                         bot.channels.cache.get('752262073878052956').send(unauthorized);
                     }}
            break;
            //Mute a user from the server
            //NOTES: if the user was kicked using YAGPDB then this command as well as the unmute command will not work!
        case 'unmuteuser':
            if(message.member.roles.cache.has('718155663334703145')){
                let role = message.guild.roles.cache.find(r => r.name === "Muted");
                let user = message.mentions.members.first();
                let rmember = message.mentions.members.first();
                let reason = message.content.slice("-unmuteuser".length)
                rmember.roles.remove(role);
                const embed = new Discord.MessageEmbed()
                    .setTitle('User Unmuted')
                    .setDescription(`${user.user.username}#${user.user.discriminator}`)
                    .addField('Executed by', message.author.tag)
                    .addField('Reasons', reason)
                    .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/updated-muted.png?1597002395')
                    .setColor(0xFFA500)
                    .setTimestamp()
                    bot.channels.cache.get('752261967330410627').send(embed);

        } else {
            if(message.member.roles.cache.has('718155609173786685')){
                let role = message.guild.roles.cache.find(r => r.name === "Muted");
                let user = message.mentions.members.first();
                let rmember = message.mentions.members.first();
                let reason = message.content.split(" ");
                rmember.roles.remove(role);
                const embed = new Discord.MessageEmbed()
                    .setTitle('User Unmuted')
                    .setDescription(`${user.user.username}#${user.user.discriminator}`)
                    .addField('Executed by', message.author.tag)
                    .addField('Reasons', reason)
                    .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/updated-muted.png?1597002395')
                    .setColor(0xFFA500)
                    .setTimestamp()
                    bot.channels.cache.get('723264488706408629').send(embed);
            } else {
            message.channel.bulkDelete(1);
                const embed = new Discord.MessageEmbed()
                    .setTitle('You do not have the proper permissions to use this command!')
                    .setDescription('You have attempted to use a command that you do not have access too. If this is a mistake contact a server administrator.')
                    .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/thor-hammer.png?1596130284')
                    .setColor(0xFF0000)
                message.channel.send(embed);
                    //The embed below is sent to mod logs when an unauthorized user attempts to execute a command they don't have access to.
            const unauthorized = new Discord.MessageEmbed()
                    .setTitle('User Attempted to Use Command')
                    .setDescription('User attempted to use command that is reserved for staff roles.')
                    .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
                    .addField('User', message.author.tag)
                    .addField('Command',message.content)
                    .setTimestamp()
                    bot.channels.cache.get('752262073878052956').send(unauthorized);
             }}
    break;
            //Kick Users from the Server (STILL IN BETA)
            //NOTES:
        case'kickuser':
            let kmember = message.mentions.members.first();
        if(kmember.roles.cache.has('718155691067572345')){
                message.channel.bulkDelete(1);
                const embed = new Discord.MessageEmbed()
                .setTitle('Error')
                .setDescription('Unable to execute command.')
                .addField('Reason', 'Staff Members are immune to moderation commands.') 
                .setColor(0xffde02)
                .setTimestamp()                                
            message.channel.send(embed);
        } else {
        if(message.member.roles.cache.has('718155691067572345')){
            message.channel.bulkDelete(1);
            let user = message.mentions.members.first();
            let reason = message.content
            let member = message.mentions.members.first();
            
                if (user) {

                let member = message.guild.member(user)};

                if (member) {

                    member
                        .kick(reason)
                            .then(() => {

                            message.reply(`Has kicked ${user} from the server.`);
                              })
                            .catch(err => {
                            message.reply('I was unable to kick the member');

                            console.error(err);
                              });
                            const embed = new Discord.MessageEmbed()
                                .setTitle('Member Kicked')
                                .setDescription(`${user.user.username}#${user.user.discriminator}`)
                                .addField('Executed by', message.author.tag)
                                .addField('Reasons', reason)
                                .setColor(0xffde02)
                                .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/kick-updated.png?1597002846')
                                .setTimestamp()                                  
                                bot.channels.cache.get('752261944790089778').send(embed);

                          }

                        } else {


                            if(message.member.roles.cache.has('718155663334703145')){
                                message.channel.bulkDelete(1);
                                let user = message.mentions.members.first();
                                let reason = message.content
                                let member = message.mentions.members.first();
                                
                                    if (user) {
                    
                                    let member = message.guild.member(user)};
                    
                                    if (member) {
                    
                                        member
                                            .kick(reason)
                                                .then(() => {
                    
                                                message.reply(`Has kicked ${user} from the server.`);
                                                  })
                                                .catch(err => {
                                                message.reply('I was unable to kick the member');
                    
                                                console.error(err);
                                                  });
                                                const embed = new Discord.MessageEmbed()
                                                    .setTitle('Member Kicked')
                                                    .setDescription(`${user.user.username}#${user.user.discriminator}`)
                                                    .addField('Executed by', message.author.tag)
                                                    .addField('Reasons', reason)
                                                    .setColor(0xffde02)
                                                    .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/kick-updated.png?1597002846')
                                                    .setTimestamp()                                  
                                                    bot.channels.cache.get('723264488706408629').send(embed);
                    
                                              }} else {
                                                
                            message.channel.bulkDelete(1);
                            const embed = new Discord.MessageEmbed()
                                .setTitle('You do not have the proper permissions to use this command!')
                                .setDescription('You have attempted to use a command that you do not have access too. If this is a mistake contact a server administrator.')
                                .setColor(0xFF0000)
                            message.channel.send(embed);
                                //The embed below is sent to mod logs when an unauthorized user attempts to execute a command they don't have access to.
                            const unauthorized = new Discord.MessageEmbed()
                                .setTitle('User Attempted to Use Command')
                                .setDescription('User attempted to use command that is reserved for staff roles.')
                                .addField('User', message.author.tag)
                                .addField('Command',message.content)
                                .setTimestamp()
                                bot.channels.cache.get('752262073878052956').send(unauthorized);
                        }}
                      }
    break;
    case 'banuser':
        let bmember = message.mentions.members.first();
        if(bmember.roles.cache.has('718155691067572345')){
                message.channel.bulkDelete(1);
                const embed = new Discord.MessageEmbed()
                .setTitle('Error')
                .setDescription('Unable to execute command.')
                .addField('Reason', 'Staff Members are immune to moderation commands.') 
                .setColor(0xFF0000)                                
            message.channel.send(embed);
        } else {
            if(message.member.roles.cache.has('718155691067572345')){
                let user = message.mentions.users.first();
                let reason = message.content
                let member = message.mentions.members.first();
                let bmember = message.mentions.members.first().id;
                
                    if (user) {
    
                    let member = message.guild.member(user)};
    
                    if (member) {
    
                        member
                            .ban(reason)
                                .then(() => {
    
                                message.reply(`Has banned ${user} from the server.`);
                                  })
                                .catch(err => {
                                message.reply('I was unable to ban the member');
    
                                console.error(err);
                                  });
                                const embed = new Discord.MessageEmbed()
                                    .setTitle('Member Banned')
                                    .setDescription(`${user.user.username}#${user.user.discriminator}`)
                                    .addField('Executed by', message.author.tag)
                                    .addField('Reasons', reason)
                                    .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/updatedbanned.png?1597002865')
                                    .setTimestamp()                                  
                                    bot.channels.cache.get('752261944790089778').send(embed);
    
                              }
    
                            } else {
                                message.channel.bulkDelete(1);
                                const embed = new Discord.MessageEmbed()
                                    .setTitle('You do not have the proper permissions to use this command!')
                                    .setDescription('You have attempted to use a command that you do not have access too. If this is a mistake contact a server administrator.')
                                    .setColor(0xFF0000)
                                message.channel.send(embed);
                                    //The embed below is sent to mod logs when an unauthorized user attempts to execute a command they don't have access to.
                                const unauthorized = new Discord.MessageEmbed()
                                    .setTitle('User Attempted to Use Command')
                                    .setDescription('User attempted to use command that is reserved for staff roles.')
                                    .addField('User', message.author.tag)
                                    .addField('Command',message.content)
                                    .setTimestamp()
                                    bot.channels.cache.get('752262073878052956').send(unauthorized);
                            }
                          }
        break;
        case 'warnuser':
            let wmember = message.mentions.members.first();
            if(wmember.roles.cache.has('718155691067572345')){
                message.channel.bulkDelete(1);
                const embed = new Discord.MessageEmbed()
                .setTitle('Error')
                .setDescription('Unable to execute command.')
                .addField('Reason', 'Staff Members are immune to moderation commands.') 
                .setColor(0xffde02)
                .setTimestamp()                                
            message.channel.send(embed);

            } else {
                if(message.member.roles.cache.has('718155691067572345')){
                    let user = message.mentions.members.first();
                    let reason = message.content;
                    const embed = new Discord.MessageEmbed()
                        .setTitle('User Warned')
                        .setDescription(`${user.user.username}#${user.user.discriminator}`)
                        .addField('Executed by', message.author.tag)
                        .addField('Reasons', reason)
                        .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/warning.png?1597155739')
                        .setTimestamp()
                        .setColor(0xFFFF00)
                        bot.channels.cache.get('752261944790089778').send(embed);
                        mentiondm = message.mentions.users.first(); 
                        mentiondm.send('You have been  Warned in BoyToy for the following reason\n \n'  +reason+ '\n \n If you are warned too many times you will be banned or kicked from the server!')

             } else {
                message.channel.bulkDelete(1);
                    const embed = new Discord.MessageEmbed()
                    .setTitle('You do not have the proper permissions to use this command!')
                        .setDescription('You have attempted to use a command that you do not have access too. If this is a mistake contact a server administrator.')
                        .setColor(0xFF0000)
                    message.channel.send(embed);
                        //The embed below is sent to mod logs when an unauthorized user attempts to execute a command they don't have access to.
                    const unauthorized = new Discord.MessageEmbed()
                        .setTitle('User Attempted to Use Command')
                        .setDescription('User attempted to use command that is reserved for staff roles.')
                        .addField('User', `${message.author.username}#${message.author.discriminator}`)
                        .addField('Command',message.content)
                        .setTimestamp()
                        bot.channels.cache.get('752262073878052956').send(unauthorized);      
            }}
        break;
            case 'new1kickuser': //COMMAND TO KICK USER FROM SERVER
                    let nkmember = message.mentions.members.first();
                if(nkmember.roles.cache.has('718155691067572345')){ //CHECKS TO SEE IF MEMBER BEING KICKED HAS STAFF ROLE
                        message.channel.bulkDelete(1);
                        const embed = new Discord.MessageEmbed()
                        .setTitle('Error')
                        .setDescription('Unable to execute command.')
                        .addField('Reason', 'Staff Members are immune to moderation commands.') 
                        .setColor(0xffde02)
                        .setTimestamp()                                
                    message.channel.send(embed); //SENDS EMBED TO CHANNEL WHERE COMMAND WAS EXECUTED
                }
                if(message.member.roles.cache.has('718155609173786685') || message.member.roles.cache.has('718155663334703145')) {
                    message.channel.bulkDelete(1); //DELETES EXECUTED COMMAND FROM THE CHANNEL
                    let user = message.mentions.members.first();
                    let reason = message.content //THE REASON THE USER IS BEING KICKED
                    let member = message.mentions.members.first();
                if (user) {
                    let member = message.guild.member(user)};
                if (member) {
                    member.kick(reason) //KICKS USER AND LISTS REASON
                        .then(() => {
                        message.reply(`Has kicked ${user} from the server.`);
                            })
                        .catch(err => {
                            message.reply('I was unable to kick the member');
                            console.error(err);
                              });
                    const embed = new Discord.MessageEmbed()
                        .setTitle('Member Kicked')
                        .setDescription(`${user.user.username}#${user.user.discriminator}`)
                        .addField('Executed by', message.author.tag)
                        .addField('Reasons', reason)
                        .setColor(0xffde02)
                        .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/kick-updated.png?1597002846')
                        .setTimestamp()                                  
                    bot.channels.cache.get('752261944790089778').send(embed).catch(console.error); //SENDS EMBED TO LOG CHANNEL                  
                } else {                     
                    message.channel.bulkDelete(1); //DELETES EXECUTED COMMAND FROM CHANNEL
                    const embed = new Discord.MessageEmbed()
                        .setTitle('You do not have the proper permissions to use this command!')
                        .setDescription('You have attempted to use a command that you do not have access too. If this is a mistake contact a server administrator.')
                        .setColor(0xFF0000)
                    message.channel.send(embed); //SENDS EMBED TO CHANNEL WHERE COMMAND WAS EXECUTED
                    const unauthorized = new Discord.MessageEmbed()
                        .setTitle('User Attempted to Use Command')
                        .setDescription('User attempted to use command that is reserved for staff roles.')
                        .addField('User', message.author.tag)
                        .addField('Command',message.content)
                        .setTimestamp()
                    bot.channels.cache.get('752262073878052956').send(unauthorized); //SENDS EMBED TO COMMAND BYPASS LOG
                        }}                    
            break;
            case 'banusernew':
                let nbmember = message.mentions.members.first();
                if(nbmember.roles.cache.has('718155691067572345')){ //CHECKS TO SEE IF MEMBER IS HAS STAFF ROLE
                        message.channel.bulkDelete(1);
                        const embed = new Discord.MessageEmbed()
                        .setTitle('Error')
                        .setDescription('Unable to execute command.')
                        .addField('Reason', 'Staff Members are immune to moderation commands.') 
                        .setColor(0xffde02)
                        .setTimestamp()                                
                    message.channel.send(embed); //SENDS EMBED TO CHANNEL WHERE COMMAND WAS EXECUTED
                }
                if(message.member.roles.cache.has('718155609173786685') || message.member.roles.cache.has('718155663334703145')) { //CHECKS TO SEE IF USER HAS MOD CREW OR ADMIN CREW ROLE
                    message.channel.bulkDelete(1); //DELETES EXECUTED COMMAND FROM THE CHANNEL
                    let user = message.mentions.members.first();
                    let reason = message.content //THE REASON THE USER IS BEING BANNED
                    let member = message.mentions.members.first();
                if (user) {
                    let member = message.guild.member(user)};
                if (member) {
                    member.ban(reason) //BANS USER AND LISTS REASON
                        .then(() => {
                        message.reply(`Has banned ${user} from the server.`);
                            })
                        .catch(err => {
                            message.reply('I was unable to ban the member');
                            console.error(err);
                              });
                    const embed = new Discord.MessageEmbed()
                        .setTitle('Member Banned')
                        .setDescription(`${user.user.username}#${user.user.discriminator}`)
                        .addField('Executed by', message.author.tag)
                        .addField('Reasons', reason)
                        .setColor(0xffde02)
                        .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/kick-updated.png?1597002846')
                        .setTimestamp()                                  
                    bot.channels.cache.get('752261944790089778').send(embed).catch(console.error); //SENDS EMBED TO LOG CHANNEL                  
                } else {                     
                    message.channel.bulkDelete(1); //DELETES EXECUTED COMMAND FROM CHANNEL
                    const embed = new Discord.MessageEmbed()
                        .setTitle('You do not have the proper permissions to use this command!')
                        .setDescription('You have attempted to use a command that you do not have access too. If this is a mistake contact a server administrator.')
                        .setColor(0xFF0000)
                    message.channel.send(embed); //SENDS EMBED TO CHANNEL WHERE COMMAND WAS EXECUTED
                    const unauthorized = new Discord.MessageEmbed()
                        .setTitle('User Attempted to Use Command')
                        .setDescription('User attempted to use command that is reserved for staff roles.')
                        .addField('User', message.author.tag)
                        .addField('Command',message.content)
                        .setTimestamp()
                    bot.channels.cache.get('752262073878052956').send(unauthorized); //SENDS EMBED TO COMMAND BYPASS LOG
                        }}                 
            break;
            case 'newstaffapplication': //EMBED THAT IS AUTOMATICALLY SENT WITHIN STAFF APPLICATION TICKETS
                if(message.member.roles.cache.has('718155691067572345')){ //CHECKS TO SEE IF USER HAS STAFF ROLE
                     message.channel.send('To begin your application please answer these questions and a member of <@&718155691067572345> will be with you once you are finished! \nPlease answer the following questions: \n1. Where did you hear about us? \n2. What admin/mod experience do you have? (list any servers and an invite link to join) \n3. What position are you applying for? \n4. Tell us about yourself! \n5. What days/times are you online? \n6. Are you comfortable with starting conversations and encouraging others to do so? \nUpon answering the questions please give us time to look over your application!')
                } else {
                    message.channel.send('Only staff are allowed to execute this command!'); //SENDS MESSAGE WITHIN CHANNEL WHERE COMMAND WAS EXECUTED
                    const unauthorized = new Discord.MessageEmbed()
                        .setTitle('User Attempted to Use Command')
                        .setDescription('User attempted to use command that is reserved for staff roles.')
                        .addField('User', message.author.tag)
                        .addField('Command',message.content)
                        .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
                    bot.channels.cache.get('723264488706408629').send(unauthorized); //SENDS EMBED TO COMMAND BYPASS LOG CHANNEL
            }
            break;
            case 'newageverification': //EMBED THAT IS AUTOMATICALLY SENT INTO AGE VERIFICATION TICKETS
                if(message.member.roles.cache.has('718155691067572345')){ //CHECKS TO SEE IF USER HAS STAFF ROLE
                    message.channel.send(' <@&718155663334703145> <@&718155609173786685>') //SENDS MESSAGE THAT PINGS MOD CREW AND ADMIN CREW
                    const newverifyembed = new Discord.MessageEmbed()
                        .setTitle('How to Verify Your Age:')
                        .setDescription('To verify your age please choose one of the options below! \n \nIf you are verified in one of our <#726076505158975549> servers simply send a screenshot showing your verified role in that server. \n \nOR \n \nSend a selfie of yourself holding a piece of paper with your discord username and todays date written on it. \n \n**Once complete a member of <@&718155691067572345> will help finish the verification process!**')
                        .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/published/426713-200.png?1596596212')
                         .setColor(0x52FF8F)
                    message.channel.send(newverifyembed); //SENDS EMBED THAT HAS DIRECTIONS ON HOW TO VERIFY AUTOMATICALLY INTO THE TICKET
                } else { //ANYONE THAT DOESNT HAVE STAFF ROLE
                    message.channel.send('Only staff are allowed to execute this command!');
                    const unauthorized = new Discord.MessageEmbed()
                        .setTitle('User Attempted to Use Command')
                        .setDescription('User attempted to use command that is reserved for staff roles.')
                        .addField('User', message.author.tag)
                        .addField('Command',message.content)
                        .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
                bot.channels.cache.get('723264488706408629').send(unauthorized); //SENDS EMBED TO COMMAND BYPASS LOG CHANNEL
                 }
            break;
            case 'join': //COMMAND THAT USER ENTERS THAT ASSIGNS THE ROLE CALLED ROLES ASSIGNED GROOM
                if(message.member.roles.cache.has('723225081890996224', '&755135360819921086', '755130367739953223')){ //CHECKS TO SEE IF USER HAS AGE, DM STATUS, AND LOCATION ROLES ASSIGNED NEEDS TO BE SET UP!!!!
                if(message.member.roles.cache.has('721901417073475694')){ //CHECKS TO SEE IF USER HAS GAY SEXUALITY ROLE ASSIGNED
                    let gayrole = message.guild.roles.cache.find(r => r.name === "Gay Room Member");
                    let gaynonassigned = message.guild.roles.cache.find(r => r.name === "Gay No Roles Member")
                    let newgayuserembed = new Discord.MessageEmbed()
                        .setTitle('New Member Joined The Gay Room')
                        .setDescription(message.author.tag)
                        .setTimestamp()
                    bot.channels.cache.get('752666805713240155').send(newgayuserembed) //SENDS EMBED TO GAY ROOM LOG CHANNEL
                    message.member.roles.add(gayrole)
                    message.member.roles.remove(gaynonassigned)
                }
                if(message.member.roles.cache.has('752699448580374559')){ //CHECKS TO SEE IF USER HAS THE LESBIAN SEXUALITY ROLE ASSIGNED
                    let lesbianrole = message.guild.roles.cache.find(r => r.name === "Lesbian Room Member");
                    let lesbiannonassigned = message.guild.roles.cache.find(r => r.name === "Lesbian No Roles Member")
                    let newlesbianuserembed = new Discord.MessageEmbed()
                        .setTitle('New Member Joined The Lesbian Room')
                        .setDescription(message.author.tag)
                        .setTimestamp()
                    bot.channels.cache.get('752672191321210991').send(newlesbianuserembed) 
                    message.member.roles.add(lesbianrole)
                    message.member.roles.remove(lesbiannonassigned)
                }
                if(message.member.roles.cache.has('721901477379178517')){ //CHECKS TO SEE IF USER HAS THE BISEXUAL SEXUALITY ROLE ASSIGNED
                    let birole = message.guild.roles.cache.find(r => r.name === "Bi Room Member");
                    let binonassigned = message.guild.roles.cache.find(r => r.name === "Bi No Roles Member")
                    let newlesbianuserembed = new Discord.MessageEmbed()
                        .setTitle('New Member Joined The Bi Room')
                        .setDescription(message.author.tag)
                        .setTimestamp()
                    bot.channels.cache.get('752666805713240155').send(newlesbianuserembed)
                    message.member.roles.add(birole)
                    message.member.roles.add(binonassigned)
                }
                if(message.member.roles.cache.has('752699708832481321')){ //CHECKS TO SEE IF USER HAS THE TRANS SEXUALITY ROLE ASSIGNED
                    let transrole = message.guild.roles.cache.find(r => r.name === "Trans Room Member");
                    let transnonassigned = message.guild.roles.cache.find(r => r.name === "Trans No Roles Member")
                    let newlesbianuserembed = new Discord.MessageEmbed()
                        .setTitle('New Member Joined The Bi Room')
                        .setDescription(message.author.tag)
                        .setTimestamp()
                    bot.channels.cache.get('752666805713240155').send(newlesbianuserembed)
                        message.member.roles.add(transrole)
                        message.member.roles.remove(transnonassigned)
                }
            
            } else {
                message.reply('You have not assigned all of the required roles!')
            }
            break;
            case 'rrmuteuser':
                if(message.member.roles.cache.has('718155663334703145', '&718155609173786685')){
                    message.channel.bulkDelete(1);
                    let user = message.mentions.members.first()
                    if (user.roles.cache.has('752699448580374559')){ //CHECKS TO SEE IF USER HAS LESBIAN SEXUALITY ROLE
                        let lreason = message.content.slice("-rrmuteuser".length)
                        let lrmuted = message.guild.roles.cache.find(r => r.name === "LR MUTED")
                        let lrmember = message.guild.roles.cache.find(r => r.name === "Lesbian Room Member")
                        user.roles.add(lrmuted)
                        user.roles.remove(lrmember)
                        let lmuteembed = new Discord.MessageEmbed()
                        .setTitle('User Muted')
                        .setDescription('User has been muted in The Lesbian Room')
                        .addField(`User:`, `${user.user.username}#${user.user.discriminator}`)
                        .addField(`Reason:`, `${lreason}`)
                        bot.channels.cache.get('752672191321210991').send(lmuteembed).catch(console.error);
                    }
                    if (user.roles.cache.has('721901417073475694')){ //CHECKS TO SEE IF USER HAS GAY SEXUALITY ROLE
                        let greason = message.content.slice("-rrmuteuser".length)
                        let grmuted = message.guild.roles.cache.find(r => r.name === "GR MUTED")
                        let grmember = message.guild.roles.cache.find(r => r.name === "Gay Room Member")
                        user.roles.add(grmuted)
                        user.roles.remove(grmember)
                        let lmuteembed = new Discord.MessageEmbed()
                            .setTitle('User Muted')
                            .setDescription('User has been muted in The Gay Room')
                            .addField(`User:`, `${user.user.username}#${user.user.discriminator}`)
                            .addField(`Reason:`, `${greason}`)
                    bot.channels.cache.get('75266680571324015').send(lmuteembed).catch(console.error);
                    }
                    if (user.roles.cache.has('721901477379178517')){ //CHECKS TO SEE IF USER HAS BI SEXUALITY ROLE
                        let breason = message.content.slice("-rrmuteuser".length)
                        let brmuted = message.guild.roles.cache.find(r => r.name === "BR MUTED")
                        let brmember = message.guild.roles.cache.find(r => r.name === "Bi Room Member")
                        user.roles.add(brmuted)
                        user.roles.remove(brmember)
                        let lmuteembed = new Discord.MessageEmbed()
                            .setTitle('User Muted')
                            .setDescription('User has been muted in The Bisexual Room')
                            .addField(`User:`, `${user.user.username}#${user.user.discriminator}`)
                            .addField(`Reason:`, `${breason}`)
                        bot.channels.cache.get('752673465370411068').send(lmuteembed).catch(console.error);
                        }
                    if (user.roles.cache.has('752699708832481321')){ //CHECKS TO SEE IF USER HAS TRANS SEXUALITY ROLE
                        let treason = message.content.slice("-rrmuteuser".length)
                        let trmuted = message.guild.roles.cache.find(r => r.name === "TR MUTED")
                        let trmember = message.guild.roles.cache.find(r => r.name === "Trans Room Member")
                        user.roles.add(trmuted)
                        user.roles.remove(trmember)
                        let lmuteembed = new Discord.MessageEmbed()
                            .setTitle('User Muted')
                            .setDescription('User has been muted in The Trans Room')
                            .addField(`User:`, `${user.user.username}#${user.user.discriminator}`)
                            .addField(`Reason:`, `${treason}`)
                        bot.channels.cache.get('752675302509117440').send(lmuteembed).catch(console.error);
                    }} else {
                        message.channel.bulkDelete(1);
                        message.channel.send(`Only Moderators and Admins have access to this command!`).catch(console.error);
                            const muteunauthorized = new Discord.MessageEmbed()
                        .setTitle('User Attempted to Use Command')
                        .setDescription('User attempted to use command that is reserved for staff roles.')
                        .addField('User', message.author.tag)
                        .addField('Command',message.content)
                        .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
                    bot.channels.cache.get('723264488706408629').send(muteunauthorized); //SENDS EMBED TO COMMAND BYPASS LOG CHANNEL
                    }
            break;
            case 'sexualitymenu':
                if(message.member.roles.cache.has('718155609173786685')){
                    message.channel.bulkDelete(1);
                    let smenu = new Discord.MessageEmbed()
                        .setTitle(`Choose A Sexuality Role`)
                        .setDescription(`Choose a sexuality role to unlock it's room. Remember that once you select a role this menu becomes inaccessable. The only way to change your sexuality is by opening a support ticket within <#752668344821219399> \n \n <:letterl:753733539777740800> Lesbian \n \n <:letterg:753733572720066660> Gay \n \n <:letterb:753733598233755790> Bisexual \n \n<:lettert:753733622803988581> Transgender`)
                        .setColor(0xff0000)
                            message.channel.send(smenu).then(embedMessage => {
                            embedMessage.react("753733539777740800")
                            embedMessage.react("753733572720066660")
                            embedMessage.react("753733598233755790")
                            embedMessage.react("753733622803988581")
                        })} else {
                message.channel.bulkDelete(1);
                message.channel.send(`Only Admin Crew Members have access to this command!`).catch(console.error);
                    const unauthorized = new Discord.MessageEmbed()
                .setTitle('User Attempted to Use Command')
                .setDescription('User attempted to use command that is reserved for staff roles.')
                .addField('User', message.author.tag)
                .addField('Command',message.content)
                .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
            bot.channels.cache.get('723264488706408629').send(unauthorized); //SENDS EMBED TO COMMAND BYPASS LOG CHANNEL
                }
            break;
            case 'botinfo':
                if(message.member.roles.cache.has('718155609173786685')){
                    let infoembed = new Discord.MessageEmbed()
                        .setTitle('Red Room Bot Info')
                        .setDescription('Below is the current information and stats for The Red Room Bot')
                        .addField('Version:', '2.4.2')
                        .addField('Developed By:', 'Wrench')
                        .addField('Status:', 'Online')
                        .setColor(0xff0000)
                        message.channel.send(infoembed).catch(console.error);
             } else {
                message.channel.bulkDelete(1);
                message.channel.send(`Only Admin Crew Members have access to this command!`).catch(console.error);
                    const unauthorized = new Discord.MessageEmbed()
                .setTitle('User Attempted to Use Command')
                .setDescription('User attempted to use command that is reserved for staff roles.')
                .addField('User', message.author.tag)
                .addField('Command',message.content)
                .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
            bot.channels.cache.get('723264488706408629').send(unauthorized); //SENDS EMBED TO COMMAND BYPASS LOG CHANNEL

                    }
            break;
            case 'newrrmuteuser':
            if(message.member.roles.cache.has('718155663334703145')){
                let mmember = message.mentions.members.first();
                let user = message.mentions.members.first();
                if(mmember.roles.cache.has('718155691067572345')){
                    message.channel.send(`Staff Members are immune to moderation commands!`)
            }
                if(mmember.roles.cache.has('753318651871887440')){
                    message.channel.bulkDelete(1);
                    let lmutedrole = message.guild.roles.cache.find(r => r.name === "LR MUTED");
                    let luserid = message.mentions.users.first().id
                    let lreason = message.content.slice("-muteuser".length)
                    mmember.roles.add(lmutedrole);
                    let lmutedembed = new Discord.MessageEmbed()
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
                if(mmember.roles.cache.has('753315050890068019')){
                    message.channel.bulkDelete(1);
                        let gmutedrole = message.guild.roles.cache.find(r => r.name === "GR MUTED");
                        let greason = message.content.slice("-muteuser".length)
                        let guserid = message.mentions.users.first().id
                        mmember.roles.add(gmutedrole);
                        let gmutedembed = new Discord.MessageEmbed()
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
                if(mmember.roles.cache.has('753318813583540284')){
                    message.channel.bulkDelete(1);
                    let bmutedrole = message.guild.roles.cache.find(r => r.name === "BR MUTED");
                    let breason = message.content.slice("muteuser".length)
                    let buserid = message.mentions.user.first().id
                    mmember.roles.add(bmutedrole);
                    let bmutedembed = new Discord.MessageEmbed()
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
            if(mmember.roles.cache.has('753318980890132610')){
                message.channel.bulkDelete(1);
                let tmutedrole = message.guild.roles.cache.find(r => r.name === "TR MUTED");
                let treason = message.content.slice("-muteuser".length)
                let tuserid = message.mentions.user.first().id
                mmember.roles.add(tmutedrole);
                let tmutedembed = new Discord.MessageEmbed()
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
            } else {
                message.channel.send('Only Moderation and Admin Crew members are allowed to execute this command!'); //SENDS MESSAGE WITHIN CHANNEL WHERE COMMAND WAS EXECUTED
                const unauthorized = new Discord.MessageEmbed()
                    .setTitle('User Attempted to Use Command')
                    .setDescription('User attempted to use command that is reserved for staff roles.')
                    .addField('User', message.author.tag)
                    .addField('Command',message.content)
                    .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
                bot.channels.cache.get('723264488706408629').send(unauthorized); //SENDS EMBED TO COMMAND BYPASS LOG CHANNEL


            }
            break;
            case 'newunmutemuteuser':
                if(message.member.roles.cache.has('718155663334703145')){
                    let mmember = message.mentions.members.first();
                    let user = message.mentions.members.first();
                    if(mmember.roles.cache.has('718155691067572345')){
                        message.channel.send(`Staff Members are immune to moderation commands!`)
                }
                    if(mmember.roles.cache.has('754871650935242844')){ //LR MUTED
                        message.channel.bulkDelete(1);
                        let lrmember = message.guild.roles.cache.find(r => r.name === "LR MUTED");
                        let luserid = message.mentions.users.first().id
                        let lreason = message.content.slice("-unmuteuser".length)
                        mmember.roles.add(lmutedrole);
                        let lmutedembed = new Discord.MessageEmbed()
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
                    if(mmember.roles.cache.has('753315050890068019')){
                        message.channel.bulkDelete(1);
                            let gmutedrole = message.guild.roles.cache.find(r => r.name === "GR MUTED");
                            let greason = message.content.slice("-unmuteuser".length)
                            let guserid = message.mentions.users.first().id
                            mmember.roles.add(gmutedrole);
                            let gmutedembed = new Discord.MessageEmbed()
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
                    if(mmember.roles.cache.has('753318813583540284')){
                        message.channel.bulkDelete(1);
                        let bmutedrole = message.guild.roles.cache.find(r => r.name === "BR MUTED");
                        let breason = message.content.slice("unmuteuser".length)
                        let buserid = message.mentions.user.first().id
                        mmember.roles.add(bmutedrole);
                        let bmutedembed = new Discord.MessageEmbed()
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
                if(mmember.roles.cache.has('753318980890132610')){
                    message.channel.bulkDelete(1);
                    let tmutedrole = message.guild.roles.cache.find(r => r.name === "TR MUTED");
                    let treason = message.content.slice("-unmuteuser".length)
                    let tuserid = message.mentions.user.first().id
                    mmember.roles.add(tmutedrole);
                    let tmutedembed = new Discord.MessageEmbed()
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
                } else {
                    message.channel.send('Only Moderation and Admin Crew members are allowed to execute this command!'); //SENDS MESSAGE WITHIN CHANNEL WHERE COMMAND WAS EXECUTED
                    const unauthorized = new Discord.MessageEmbed()
                        .setTitle('User Attempted to Use Command')
                        .setDescription('User attempted to use command that is reserved for staff roles.')
                        .addField('User', message.author.tag)
                        .addField('Command',message.content)
                        .setThumbnail('https://boytoycommunityservers.weebly.com/uploads/1/2/4/8/124875939/denied_orig.png')
                    bot.channels.cache.get('723264488706408629').send(unauthorized); //SENDS EMBED TO COMMAND BYPASS LOG CHANNEL
    
    
                }
                break;
    }
    

})
bot.login(process.env.token)