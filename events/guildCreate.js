// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {
  client.user.setPresence({game: {name: `${client.guilds.size} Servers | ${client.settings.get("default").prefix}help `, type:0}});
  client.log("log", `New guild has been joined: ${guild.name} (${guild.id}) with ${guild.memberCount}`, "JOINED");
  client.on("guildCreate", guild => {
    let serverOwner = guild.owner.userame
    let discriminator = guild.owner.discriminator
    let guildCreate = new Discord.RichEmbed()
    .setColor("#b70000")
    .addField("Someone added Charon to : ", guild.name) 
    .addField("The Owner's ID is : ", guild.owner.id)
    .addField("With guild ID : ", guild.id)
    .setFooter(`Go see if ${serverOwner}${discriminator} needs your help!`)
    
  client.guilds.get(512733951794741248).channels.get(522577142630973444).send(guildCreate)
  });
};
