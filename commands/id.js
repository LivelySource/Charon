const Discord = require("discord.js");
// Simple ID lookup.
// -id @_Lively#0286
module.exports.run =async (bot, message, args) => {
        
const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

message.channel.send(`${member.user.username} : \`${member.user.id}\`.`);

message.delete();

}

    exports.conf = {
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "Moderator"
    };
    
    exports.help = {
      name: "id",
      category: "Moderation",
      description: "Look up a user's ID",
      usage: "id [mention]"
    };
