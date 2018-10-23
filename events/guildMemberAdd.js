// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {

  const settings = client.getSettings(member.guild.id);
  

  if (settings.welcomeEnabled !== "true") return;


  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.username);


  member.guild.channels.find("name", settings.welcomeChannel).send(welcomeMessage).catch(console.error);
};
