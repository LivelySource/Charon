const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    const settings = message.guild ? client.getSettings(message.guild.id) : client.settings.get("default");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No can do.");
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.reply("Mention a user!");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("They are too powerful to be silenced!");
    let reason = args.slice(2).join(" ");
    if (!reason) return message.reply("Where is the reason?");

    let muterole = message.guild.roles.find(`name`, "Silenced");
    //start of create role
    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Silenced",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
    //end of create role
    let mutetime = args[1];
    if (!mutetime) return message.reply(`${tomute} has been silenced for ${mutetime}`);

    message.delete().catch(O_o => {});
    let server = message.guild.name

    try {
        await tomute.send(`You have been muted for ${mutetime} in ${server}`)
    } catch (e) {
        message.channel.send(`The user has their DMs disabled, but they are silenced for ${mutetime}`)
    }

    let muteembed = new Discord.RichEmbed()
        .setDescription(`Executed by ${message.author}`)
        .setColor("#ff0000")
        .addField("Silenced :", tomute)
        .addField("Time Silenced", message.createdAt)
        .addField("Duration", mutetime)
        .addField("Reason", reason);

    let incidentschannel = message.guild.channels.find(`name`, settings.modLogChannel);

    if (!incidentschannel) return message.reply("I couldn't find your logging channel :skull:");
    incidentschannel.send(muteembed);
    message.channel.send(`<@${tomute.id}> has been slienced for ${mutetime}`)
    await (tomute.addRole(muterole.id));

    setTimeout(function() {
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> has their voice again!`);
    }, ms(mutetime));
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ts"],
    permLevel: "Moderator"
  };
  
  exports.help = {
    name: "tempsilence",
    category: "Moderation",
    description: "Silence a rule breaking user.",
    usage: "ts <@user> <duration> <reason>"
  };