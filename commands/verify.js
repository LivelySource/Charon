const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

if (message.guild.guildID(512733951794741248) == false){
        return message.reply('This command is exculsively for the Charon, support server! Try ${settings.prefix}support');
    };
  //-verify
  let rMember = message.guild.member
  let role = member.guild.roles.find("name", "Verified");
  member.addRole(role).catch(console.error);
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, "Unverified");
  member.removeRole(gRole).catch(console.error)
    rMember.send(`Congrats, you have been given the role ${gRole.name}`)
  }
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "verify",
    category: "Miscelaneous",
    description: "Verify",
    usage: "verify"
  };

