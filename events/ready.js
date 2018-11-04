module.exports = async client => {
 //So how is your day going? 
 //Okay
 //Silence, great
  await client.wait(1000);

  
  client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);

  
  if (!client.settings.has("default")) {
    if (!client.config.defaultSettings) throw new Error("defaultSettings not found, look in config");
    client.settings.set("default", client.config.defaultSettings);
  }

  
  require("../modules/dashboard")(client);  

  
  client.user.setPresence({game: {name: `In ${client.guilds.size} servers. | ${client.settings.get("default").prefix}help `, type:0}});

  // This means the bot is ready hehehe
  client.log("log", `${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "Ready!");
};
