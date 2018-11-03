const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Could not find the specified user");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("You did not specify a role");
  let kRole = message.guild.roles.find(`name`, role);
  if(!kRole) return message.reply("Couldn't find the specified role.")
  let server = message.guild.name
  
  message.delete().catch(O_o=>{});

  if(!rMember.roles.has(kRole.id)) return message.reply("They don't have that role.");
  await(rMember.removeRole(kRole.id));

  try{
     await rMember.send(`The role ${kRole.name} has been stripped away from you in ${server}`)
  }catch(e){
  message.channel.send(`<@${rMember.id} his role has been stripped away ${kRole.name}`)
  }


}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Administrator"
  };
  
  exports.help = {
    name: "takerole",
    category: "Moderation",
    description: "Take a role from a selected user.",
    usage: "takerole [mention] <role> "
  };