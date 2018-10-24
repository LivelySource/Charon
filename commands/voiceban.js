const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if(!args[0]) {message.channel.send("Mention the user you want to ban from voice!"); return;}
    if(message.mentions.users.first() == null) {
        var zn2 = false;
        message.guild.members.forEach(async memb => {
            if(memb.user.username.toLowerCase() == args[0].toLowerCase()) {
                if(memb.user.id == client.user.id) {message.reply("mnie się nie banuje!"); return;}
                zn2 = true;
                message.guild.createChannel("Kick", "voice").then(vChan => {
                    memb.setVoiceChannel(vChan).then(mem => vChan.delete());
                }).catch(err => anticrash(message.channel, err));
                message.react("✅");
                await db.getVoiceBans(message.guild.id).then(async bany => {
                    if(bany == undefined) bany = [];
                    bany.push(memb.user.id);
                    await db.update('guilds', message.guild.id, 'voiceBans', bany);
                });
            }
        });
        if (zn2 == false) {
            message.reply("That user was not found, so try again");
            return;
        }
    } else {
        var memb = message.guild.member(message.mentions.users.first());
        if(memb.user.id == client.user.id) {message.reply("yeah"); return;}
        message.guild.createChannel("Kick", "voice").then(vChan => {
            memb.setVoiceChannel(vChan).then(mem => vChan.delete());
        }).catch(err => anticrash(message.channel, err));
        message.react("✅");
        await db.getVoiceBans(message.guild.id).then(async bany => {
            if(bany == undefined) bany = [];
            bany.push(memb.user.id);
            await db.update('guilds', message.guild.id, 'voiceBans', bany);
        });
    }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["Voiceban"],
  permLevel: "Moderator"
};

exports.help = {
  name: "voiceban",
  category: "Moderation",
  description: "Bans a user from voice",
  usage: "voiceban [mention]"
};