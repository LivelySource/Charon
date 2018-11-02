//Report advanced motherfucka

const Discord = require("discord.js");
const Report = require("./schema/report.js");
const mongoose = require("mongoose");
mongoose.connect('mongodb://cluster0-zhqid.mongodb.net/Reports');
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
  
  const report = new Report({
    _id: mongoose.Types.ObjectId(),
    username: rUser.user.username,
    userID: rUser.id,
    reason: reason,
    snitch: message.author.username,
    snitchID: message.author.id,
    time: message.createdAt
  })

  report.save()
  .then(result => console.log(result))
  .catch(console.log(error));
  channel.send('Report has been logged in the database.');
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