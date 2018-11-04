   const Discord = require('discord.js'), 
    arraySort = require('array-sort'), 
    table = require('table'); 
    send = require('quick.hook'); 


    module.exports.run = async (bot, message, args, tools) => {



  let invites = await message.guild.fetchInvites().catch(error => { 
      
      return message.channel.send("Sorry, I don\'t have the proper permissions to view invites!");
  }) 

  
  invites = invites.array();

  
  arraySort(invites, 'uses', { reverse: true }); 

  
  let possibleInvites = [['User', 'Uses']]; 
  invites.forEach(function(invite) {
      possibleInvites.push([invite.inviter.username, invite.uses]); 
  })

  
  let embed = new Discord.RichEmbed()
      .setColor("#15d4db")
      .addField('Leaderboard', `\`\`\`${table.table(possibleInvites)}\`\`\``); 


    //   message.channel.send(embed);
     

  
  send(message.channel, embed, {
      name: 'Server Invites',
      icon: 'https://cdn.discordapp.com/attachments/494751952480108546/508540365805191168/agreement.png'
  })
  
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["il"],
    permLevel: "User"
  };
  
  exports.help = {
    name: "inviteleaderboard",
    category: "Miscelaneous",
    description: "The leaderboard of invites",
    usage: "inviteleaderboard"
  };
 