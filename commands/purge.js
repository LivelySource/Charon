module.exports.run = (bot, message, args) => {
	if (message.member.hasPermission("MANAGE_MESSAGES")) {
  if (isNaN(args[0])) {
    return message.channel.send('A number would be nice...').then(m => m.delete(2000))
  }

  var am = args[0]
  message.channel.send("Purging " + am + " messages... :skull:").then(m => m.delete(2500))

  setTimeout(() => {
    message.channel.bulkDelete(am)
    .then(() => {
        message.channel.send("I've purged out  " + am + " messages! :skull:").then(m => m.delete(2000))
    })
    .catch(err => message.channel.send("I couldn't purge those messages.").then(m => m.delete(2000)))
  }, 1000);
} else {
	message.channel.send("You don't have permission to do that! :skull:").then(m => m.delete(2000))
	}
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["clear"],
    permLevel: "Moderator"
  };
  
  exports.help = {
    name: "purge",
    category: "Moderation",
    description: "Cleaning it up",
    usage: "purge <amount>"
  };