const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let server = message.guild.name;
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription(" 💀**Moderation Logging**💀 ")
    .setColor("#e56b00")
    .addField("👋 Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("💁 Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("📄 Kicked In", message.channel)
    .addField("⏱ Time", message.createdAt)
    .addField("📝Reason", kReason)
    .setFooter(`Executed in ${server}`, message.guild.iconURL);

    let kickChannel = message.guild.channels.find(`name`, message.settings.modLogChannel);
    if(!kickChannel) return message.channel.send("Can't find mog-log channel.");
	
    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}
exports.conf = {
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "Moderator"
    };
    
    exports.help = {
      name: "kick",
      category: "Moderation",
      description: "Kicks a user",
      usage: "kick [mention] <reason>"
    };