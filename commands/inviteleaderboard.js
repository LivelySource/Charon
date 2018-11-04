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

  let BOTLOGO = bot.user.displayAvatarURL

  let embed = new Discord.RichEmbed()
      .setColor("#ffffff")
      .addField('Leaderboard', `\`\`\`${table.table(possibleInvites)}\`\`\``)
      .setFooter("Tracked By Charon", BOTLOGO)


    //   message.channel.send(embed);
     

  
  send(message.channel, embed, {
      name: 'Invite Leaderboard',
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
 