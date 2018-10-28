const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  //-report @_Lively (Reason)

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Couldn't find user.");
  let reason = args.join (" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
  .setDescription("Reports")
  .setColor('RANDOM')
  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  .addField("Reported By", `${message.author} With ID: ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", reason);

  let reportschannel = message.guild.channels.find(`name`, "mod-log")
  if(!reportschannel) return message.channel.send("Couldn't find the mod-log channel.");


  message.delete().catch(O_o=>{});
  reportschannel.send(reportEmbed);

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "report",
  category: "Miscelaneous",
  description: "Report a user.",
  usage: "report [mention] <reason>"
};