
module.exports = (client, member) => {

  const settings = client.getSettings(member.guild.id);
  

  if (settings.goodbyeEnabled !== "true") return;


  const goodbyeMessage = settings.goodbyeMessage.replace("{{user}}", member.user.tag);


  member.guild.channels.find("name", settings.goodbyeChannel).send(goodbyeMessage).catch(console.error);
};