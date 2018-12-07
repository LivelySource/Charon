const Discord = require("discord.js");
const Bans = require("../model/ban.js");
const mongoose = require("mongoose");
mongoose.connect(process.env.reports, {
  useNewUrlParser: true
});
module.exports.run = async (bot, message, args) => {

      // -ban @_Lively#0286 <reason>

      let bUser = message.mentions.members.first()
      if(!bUser) return message.channel.send("Can't find user!");
      let bReason = args.join(" ").slice(22);
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You're not Authorized to use this command");
      if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person cannot be banned");
      if(!bReason) return message.reply("Enter a reason");
      let server = message.guild.name
      let serverID= message.guild.id

      let banEmbed = new Discord.RichEmbed()
      .setTitle(" 💀**Moderation Logging**💀 ")
      .setThumbnail(bUser.avatarURL)
      .setColor("#e56b00")
      .addField("🔨 Banned User", `${bUser} with ID ${bUser.id}`)
      .addField("🛠 Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("📄 Banned In", message.channel)
      .addField("⏱ Time", message.createdAt)
      .addField("📝 Reason", bReason)
      .setTimestamp();
      
      message.delete().catch(O_o=>{});
      message.channel.send(`The user ${bUser} has been banned`).then(msg => msg.delete(3000))
      .then(bUser => console.log(`Banned ${bUser.username || bUser.id || bUser} from ${server}`))
      .catch(console.error);
      
      let banChannel = message.guild.channels.find(`name`, message.settings.modLogChannel);
       if(!banChannel) return message.channel.send("Can't find logs channel.");

       const ban = new Bans({
        _id: mongoose.Types.ObjectId(),
        server: message.guild.id,
        username: bUser.user.username,
        userID: bUser.id,
        reason: bReason,
        staff: message.author.username,
        staffID: message.author.id,
        server: server,
        serverID: serverID,
        time: message.createdAt
      });

      ban.save()
      .then(result => console.log(result))
      .catch(err => console.log(err));
      message.guild.member(bUser).ban(bReason);
      banChannel.send(banEmbed)
      
    }

    exports.conf = {
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "Moderator"
    };
    
    exports.help = {
      name: "ban",
      category: "Moderation",
      description: "Bans a rule breaking user.",
      usage: "ban [mention] <reason>"
    };