const Discord = require('discord.js')
const superagent = require('superagent');
// Some people get bored.
const run = module.exports.run = async (client, message, args) => {
  let{body} = await superagent
  .get(`https://api-to.get-a.life/meme`);

  let me = new Discord.RichEmbed() 
  .setColor('RANDOM')
  .setFooter(`Requested by ${message.author.username}`)
  .setImage(body.url);

  message.channel.send(me);
    }

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "meme",
  category: "Fun",
  description: "Quick easy way to look at memes.",
  usage: "meme"
};