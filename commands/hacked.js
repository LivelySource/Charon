const superagent = require("superagent");
const Discord = require('discord.js');
exports.run = async (client, message, args, level) => {
    await message.delete(300);
    let {
        body
    } = await superagent
        .get(`https://haveibeenpwned.com/api/v2/breachedaccount/${args[0]}`)
        .catch(err => {
            message.channel.send(`Oh, it seems that you're good! \`\`${args[0]}\`\``)
        });

    let out = `I have some bad news, it seems that ${args[0]} has been compromised!`;
    let po = 0;
    const format = body.forEach(i => {
        po++;
        out += `\n${po}.   ${i.Name}   breached on:   ${i.BreachDate}`
    })
    message.author.send(out);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["hacked", "pwned?", "pwned", "haveibeenpwned"],
  permLevel: "User"
};

exports.help = {
  name: "hacked?",
  category: "Fun",
  description: "Check if your information has been comprosmised",
  usage: "hacked?"
};