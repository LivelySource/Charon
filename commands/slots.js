const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    if (!message.guild.member(client.user).hasPermission("SEND_MESSAGES")) return message.author.send('I don\'t have permission to Send Messages. Please enable send messages for my role!');

    let slots = ["🍎", "🍌", "🍒", "🍓", "🍈"];
    let result1 = Math.floor((Math.random() * slots.length));
    let result2 = Math.floor((Math.random() * slots.length));
    let result3 = Math.floor((Math.random() * slots.length));
    let name = message.author.displayName;
    let bicon = message.author.displayAvatarURL;

    if (slots[result1] === slots[result2] && slots[result3]) {
        let wEmbed = new Discord.RichEmbed()
            .setFooter("You Won!", bicon)
            .setTitle(':slot_machine:Slots:slot_machine:')
            .addField('Result:', slots[result1] + slots[result2] + slots[result3], true)
            .setColor("#ff0000");
        message.channel.send(wEmbed);
    } else {
        let embed = new Discord.RichEmbed()
            .setFooter('You Lost!', bicon)
            .setTitle(':slot_machine:Slots:slot_machine:')
            .addField('Result', slots[result1] + slots[result2] + slots[result3], true)
            .setColor("#ff0000");
        message.channel.send(embed);
    }

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["gamble"],
    permLevel: "User"
  };
  
  exports.help = {
    name: "slots",
    category: "Fun",
    description: "have a little fun",
    usage: "slots"
  };