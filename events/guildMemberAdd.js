//Send isn't working for some f-ing reason.

module.exports = (client, member) => {

  const settings = client.getSettings(member.guild.id);
  

  if (settings.welcomeEnabled !== "true") return;


  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);


  member.guild.channels.find("name", settings.welcomeChannel).send(welcomeMessage).catch(console.error);

  if (settings.autoRoleEnabled !== "true") return;
  
  let role = member.guild.roles.find("name", settings.autoRole);
  
  member.addRole(role).catch(console.error);
};