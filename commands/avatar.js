const Discord = require("discord.js");

exports.run = async (bot, message, args) => { 

    var footertext = [`${bot.user.username}: oof sexy`, `${bot.user.username}: nice`, `${bot.user.username}: 🔥`, `${bot.user.username}: Someone's looking sharp today!`, `${bot.user.username}: oof if i wasn't a bot...`, `${bot.user.username}: looking sexier than a mug`];
    var rand = Math.floor(Math.random() * footertext.length);
    var randomfooter = footertext[rand]; 


    message.channel.startTyping();


    let msg = await message.channel.send('``Generating avatar``') 

    let user = message.mentions.users.first() || message.author; 


    let boticon = bot.user.displayAvatarURL;
    let embed = new Discord.RichEmbed() 
        .setAuthor(`${user.username}'s Avatar`) 
        .setImage(user.displayAvatarURL) 
        .setColor(msg.guild.me.highestRole.color) 
        .setFooter(`${randomfooter}`, `${boticon}`) 
        .setTimestamp(); 

    await message.channel.send(embed) 

    message.channel.stopTyping(true);

    msg.delete();
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['Avatar','AVATAR'],
  permLevel: "User"
};

exports.help = {
  name: "avatar",
  category: "Fun",
  description: "Let me get a closer look at that ass.",
  usage: "avatar [mention]"
};