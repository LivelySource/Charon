const Discord = require("discord.js");

exports.run = (client, message, args) => {
    const reason = args.slice(1).join(' ');
    client.unbanReason = reason;
    client.unbanAuth = message.author;
    const user = args[0];
    let unbanChannel = message.guild.channels.find(`name`, message.settings.modLogChannel);
    if(!unbanChannel) return message.channel.send("Can't find mog-log channel.");
    if (reason.length < 1) return message.reply('You must supply a reason for the unban.');
    if (!user) return message.reply('You must supply a User Resolvable(Their ID)!').catch(console.error);
    let unbanEmbed = new Discord.RichEmbed()
      .setTitle("🔓 User Pardoned")
      .setThumbnail(user.avatarURL)
      .setColor("#bc0000")
      .addField("🔓 Pardoned User", `${user} with ID ${user.id}`)
      .addField("💁 Pardoned By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("⏱ Time", message.createdAt)
      .addField("📝 Reason", reason)
      .setTimestamp();
    message.guild.unban(user);
    message.reply(`Successfuly unbanned <@${user}>`).then(m => m.delete(2000));
    unbanChannel.send(unbanEmbed)
}
exports.conf = {
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "Moderator"
    };
    
    exports.help = {
      name: "unban",
      category: "Moderation",
      description: "Unbans a user",
      usage: "unban [mention] <reason>"
    };