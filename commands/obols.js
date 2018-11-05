const Discord = require('discord.js');
const mongoose = require("mongoose");

mongoose.connect(process.env.reports, {
  useNewUrlParser: true 
});

const Obols = require("../model/obols.js")

module.exports.run = async (bot, message, arg) => {
    await message.delete();
    

    Obols.findOne({userID: message.author.id, serverID: message.guild.id}, (err, obols) => {
        if(err) console.log(err);

        let UserAvatar = message.author.displayAvatarURL
        let obolsemb = new Discord.RichEmbed()
        .setTitle("Obols")
        .setColor("#00f00")
        .setThumbnail("https://cdn.discordapp.com/attachments/494751952480108546/508774432249085972/odolsfig.gif")
        .setFooter(message.author.username,  )
        if(!obols){
            obolsemb.addField("Obols", "0", true);
            return message.channel.send(obolsemb)

        }else {
            obolsemb.addField("Obols", obols.obols, true);
            return message.channel.send(obolsemb)           
            
        }
    })
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["coins"],
    permLevel: "User"
  };
  
  exports.help = {
    name: "obols",
    category: "Fun",
    description: "Keep track of your obols, they will grant you passage.",
    usage: "obols"
  };