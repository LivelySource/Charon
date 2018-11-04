const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let inline = true
    let BOTLOGO = bot.user.displayAvatarURL;
    let usersize = bot.users.size
    let channelsize = bot.channels.size
    let servsize = bot.guilds.size
    let botinfoembed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(BOTLOGO)
    .setDescription("[Charon's Website](https://livelysource.tk/pages/charon.html)")
    .addField("Bot Owner", "<:waytogo:502649544622735360> <@171173840364371968>", inline )
    .addField("Bot Name", `<:bot:502649544622735360> ${bot.user.username}`, inline)
    .addField("Bot Library", "<:discordjs:502649544622735360> Discord.js", inline)
    .addField("Servers", `🗄️ ${servsize}`, inline)
    .addField("Channels", `📼 ${channelsize}`, inline)
    .addField("Users", `<:user:502649544622735360> ${usersize}`, inline)
    .addField("Created On", bot.user.createdAt)
    .setFooter(`© 2018 LivelySource`)
    .setTimestamp()
    
    message.channel.send(botinfoembed);

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "botinfo",
  category: "Miscelaneous",
  description: "List of Charon's Information",
  usage: "botinfo"
};