const Discord = require("discord.js");

module.exports.run = async (bot, message, args, messages) => {

  const deleteCount = parseInt(args[0], 10);
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No no no.");
    if (!args[0] || args[0 == "0"]) return message.reply(`Are you really tring to purge *0* messages?`);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete.");
   
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  
  let purgeEmbed = new Discord.RichEmbed()
    .setAuthor("♻️ Action | Purge")
    .setColor("RANDOM")
    .addField("Executor", `<@${message.author.id}>`)
    .addField("Purge", `${args[0]}`)
    .addField("Deleted", `${args[0]}`)
    .setFooter("Bot Version 1.0.0", bot.user.displayAvatarURL);

    let purgeChannel = message.guild.channels.find(`name`, message.settings.modLogChannel);
    if(!purgeChannel) return message.channel.send("Can't find mod-logs channel.");

    purgeChannel.send(purgeEmbed);

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
    description: "Clears Chat Messages",
    usage: "purge <amount>"
  };