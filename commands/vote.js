const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!args) return message.reply("Are you fucking stupid? You didn't even ask a question. smh")
    if (!message.content.includes("?")) return message.reply("You must ask a question to start a vote, include ? retard.")
        message.channel.send(`:ballot_box:  ${message.author.username} started a vote! React to my next message to vote on it, let your voice be heard! :ballot_box: `);
        const pollTopic = await message.channel.send(message.content.slice(5));
        await pollTopic.react(`✅`);
        await pollTopic.react(`⛔`);
        // Create a reaction collector
        const filter = (reaction) => reaction.emoji.name === '✅';
        const collector = pollTopic.createReactionCollector(filter, { time: 15000 });
        collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['Vote','v'],
  permLevel: "Moderator"
};

exports.help = {
  name: "vote",
  category: "Fun",
  description: "Start a Vote",
  usage: "vote [subject]"
};
