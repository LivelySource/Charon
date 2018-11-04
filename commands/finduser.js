module.exports.run = async (bot, message, args) => {

    let users = bot.users;
    let searchTerm = args[0];
    if(!searchTerm) return message.channel.send("Please type a term to search!");
    let matches = users.filter(u => u.tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    message.channel.send("Is this who who are looking for?" + matches.map(u => u.tag));

    message.delete();

 }
     exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: [],
        permLevel: "User"
      };
      
      exports.help = {
        name: "finduser",
        category: "Miscelaneous",
        description: "Find a user's tag",
        usage: "finduser [mention]"
      };