const Discord = require("discord.js");
// Checks the info of a role.
module.exports.run = async (bot, message, args) => {
    let inline = true

    let role = args.join(` `)
    if(!role) return message.reply("Specify a role!");
    let dRole = message.guild.roles.find(`name`, role);
    if(!dRole) return message.reply("Couldn't find that role.");

    const status = {
        false: "No",
        true: "Yes"
      }

    let roleinfo = new Discord.RichEmbed()
    .setColor("#00f00")
    .addField("ID", dRole.id, inline )
    .addField("Name", dRole.name, inline)
    .addField("Mention", `\`<@${dRole.id}>\``, inline)
    .addField("Hex", dRole.hexColor, inline)
    .addField("Members", dRole.members.size, inline)
    .addField("Position", dRole.position, inline)
    .addField("Hoisted", status[dRole.hoist], inline)
    .addField("Mentionable", status[dRole.mentionable], inline)
    .addField("Managed", status[dRole.managed], inline)
    
    message.channel.send(roleinfo);

}
exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: [],
        permLevel: "User"
      };
      
      exports.help = {
        name: "roleinfo",
        category: "Miscelaneous",
        description: "Displays the role information",
        usage: "roleinfo [role]"
      };