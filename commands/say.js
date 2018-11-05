const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
     const sayMessage = args.join(" ");
      message.delete().catch();

      message.channel.send(sayMessage);
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "say",
  category: "System",
  description: "Repeat what?",
  usage: "say [message]"
};