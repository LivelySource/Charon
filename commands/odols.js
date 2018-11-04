const Discord = require('discord.js');
const mongoose = require("mongoose");

mongoose.connect(process.env.reports, {
  useNewUrlParser: true 
});

const Odols = require("../model/odols.js")

module.exports.run = async (bot, message, arg) => {
    await message.delete();
    

    Odols.findone({userID: message.author.id, serverID: message.guild.id}, (err, odols) => {
        if(err) console.log(err);

        let UserAvatar = message.author.displayAvatarURL
        let odolsemb = new Discord.RichEmbed()
        .setTitle("Odols")
        .setColor("#00f00")
        .setThumbnail("https://cdn.discordapp.com/attachments/494751952480108546/508774432249085972/odolsfig.gif")
        .setFooter(message.author.username,  )
        if(!odols){
            odolsemb.addField("Odols", "0", true);
            return message.channel.send(odolsemb)

        }else {
            odolsemb.add("Odols", odols.odols, true);
            return message.channel.send(odolsemb)           
            
        }
    })
}