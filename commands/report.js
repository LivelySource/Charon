//Report advanced motherfucka

const Discord = require("discord.js");
const Report = require("../model/report.js");
const mongoose = require("mongoose");
mongoose.connect(process.env.reports, {
  useNewUrlParser: true 
});
module.exports.run = async (bot, message, args) => {
  //-report @_Lively (Reason)

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Couldn't find user.");
  let reason = args.join (" ").slice(22);
  let server = message.guild.name
  let serverID= message.guild.id

  let reportEmbed = new Discord.RichEmbed()
  .setAuthor("Reports")
  .setThumbnail(rUser.user.avatarURL)
  .setColor('RANDOM')
  .addField("⚠ - Reported User", `${rUser} with ID: ${rUser.id}`)
  .addField("⚠ - Reported by", `${message.author} With ID: ${message.author.id}`)
  .addField("⚙ - Channel", message.channel)
  .addField("🔨 - Reason", reason)
  .addField("Time", message.createdAt);

  let reportschannel = message.guild.channels.find(`name`, message.settings.modLogChannel)
  if(!reportschannel) return message.channel.send("Couldn't find the mod-log channel.");
  
  const report = new Report({
    _id: mongoose.Types.ObjectId(),
    server: message.guild.id,
    username: rUser.user.username,
    userID: rUser.id,
    reason: reason,
    snitch: message.author.username,
    snitchID: message.author.id,
    server: server,
    serverID: serverID,
    time: message.createdAt
  });

  report.save()
  .then(result => console.log(result))
  .catch(err => console.log(err));
  message.channel.send('Report has been logged in the database.');
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