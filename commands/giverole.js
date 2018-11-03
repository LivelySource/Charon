const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //-giverole @_Lively <Role>
 let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
 if(!rMember) return message.reply("Could not find the specified user");
 let role = args.join(" ").slice(22);
 if(!role) return message.reply("You did not specify a role");
 let kRole = message.guild.roles.find(`name`, role);
 if(!kRole) return message.reply("Couldn't find the specified role.")
 let server = message.guild.name

 message.delete().catch(O_o=>{});

 if (rMember.roles.has(kRole.id)) return message.reply("They already have that role.");
 await(rMember.addRole(kRole.id));

 try{
    await rMember.send(`You have been assigned the role ${kRole.name} in ${server}`)
 }catch(e){
 message.channel.send(`<@${rMember.id} has been assigned the role ${kRole.name}.`)
 }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Administrator"
  };
  
  exports.help = {
    name: "giverole",
    category: "Moderation",
    description: "Give a role to a selected user.",
    usage: "giverole [mention] <role> "
  };
