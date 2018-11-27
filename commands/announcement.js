const Discord = require('discord.js');
module.exports.run = (bot, message, args, discord) => {
  bot.guilds.forEach((guild, id) => {
    const supportguild = bot.guilds.get('512733951794741248')
    const own = guild.owner
    const msg = args.join(" ");
    
    if (!supportguild.available) return;
    const sembed = new Discord.RichEmbed()
      .addField(`Announcement:\n**${msg}**`)
      .setTimestamp()
      .setColor("#ff0000")
    
    own.send({embed: sembed})

    announcement = supportguild.channels.find("name", "announcement");
    
    message.announcement.send({embed: sembed})
  })
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Owner"
  };
  
  exports.help = {
    name: "announcement",
    category: "System",
    description: "rip",
    usage: "announcement"
  };