const Discord = require("discord.js")
 
module.exports.run = async (bot, message, args) => {

let killed = message.mentions.members.first();
if(!killed) {

let suicide = new Discord.RichEmbed()
.setColor("#00f00")
.setDescription(`${message.author} decied to kill themself 💔 REST IN PEACE`)
.setThumbnail("https://discordapp.com/channels/472174636839469088/494751952480108546/508506268537847809");

message.channel.send(suicide);

} else {

let murder = new Discord.RichEmbed()
.setColor("#00f00")
.setDescription(`${killed} was killed by ${message.author} 💔 REST IN PEACE`)
.setThumbnail("https://discordapp.com/channels/472174636839469088/494751952480108546/508506268537847809");

message.channel.send(murder);

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "kill",
  category: "Fun",
  description: "Kill yourself or a user",
  usage: "kill [mention]"
};