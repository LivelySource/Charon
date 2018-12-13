// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {
  client.user.setPresence({game: {name: `${client.guilds.size} Servers | ${client.settings.get("default").prefix}help `, type:0}});
  client.log("guild", `New guild has been joined: ${guild.name} (${guild.id}) with ${guild.memberCount}`, "JOINED");
};
