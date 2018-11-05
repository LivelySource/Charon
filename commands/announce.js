exports.run = async (client, message, args) => {
  try {
    if (args.length < 1) {
      
      return client.emit('commandUsage', message, this.help);
    }

    let guildModels = await client.database.models.guild.findAll({
      attributes: [ 'general' ]
    });

    let generalChannels = guildModels.filter(guildModel => guildModel.dataValues.generalChannel).map(guildModel => guildModel.dataValues.generalChannel);
    let announcementMessage = args.join(' ');

    for (let channel of generalChannels) {
      if (client.shard) {
        await client.shard.broadcastEval(`
          let channel = this.channels.get('${channel}');
          if (channel) {
            channel.send({
              embed: {
                color: this.colors.BLUE,
                description: \`${announcementMessage}\`
              }
            }).catch(this.log.error);
          }
        `);
      }
      else {
        await client.channels.get(channel).send({
          embed: {
            color: client.colors.BLUE,
            description: announcementMessage
          }
        }).catch(() => {});
      }
    }

    message.channel.send({
      embed: {
        color: client.colors.GREEN,
        title: 'Announced',
        description: announcementMessage
      }
    }).catch(e => {
      client.log.error(e);
    });
  }
  catch (e) {
    client.log.error(e);
  }
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Bot Owner"
  };
  
  exports.help = {
    name: "announce",
    category: "System",
    description: "Announces new features to the bot!",
    usage: "announce [message]"
  };