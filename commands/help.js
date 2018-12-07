const Discord = require('discord.js'); 
const fs = require('file-system');
module.exports.run = async (client, message, args, level,) => {
  // If no specific command is called, show all filtered commands.
  if (!args[0]) {
    // Load guild settings (for prefixes and eventually per-guild tweaks)
    const settings = message.settings;


    const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

    // This make the help commands "aligned" in the output.
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let currentCategory = "";
    let output = `!========== [Charon's Commands] ==========!\nFor any further help, direct message _Lively#0286\n\n[Use ${settings.prefix}help <commandname> for details]\n`;
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    sorted.forEach( c => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
        output += `\n---► ${cat} \n`;
        currentCategory = cat;
      }
      output += `${settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
    });

    
  
      const begin = fs.readFileSync("./begin.txt", "utf8");
      const Miscelaneous = fs.readFileSync("./miscelaneous.txt", "utf8")
      const moderationCommands = fs.readFileSync("./moderation.txt", "utf8");
      const FunCommands = fs.readFileSync("./fun.txt", "utf8");

    let descpages = [begin, moderationCommands, FunCommands, Miscelaneous]; 
    let descpage = 1;
    const embed = new Discord.RichEmbed() 
      .setColor("#ff0000")
      .setTitle('Charon\'s Commmands - Help Guide')
      .setImage("https://cdn.discordapp.com/attachments/506553672440872973/513176534199042058/yeetify.png")
      .setURL("https://livelysource.tk/portal")
      .setFooter(`Pages ${descpage} of ${descpages.length}`, "https://cdn.discordapp.com/avatars/502599671957553167/b3a0c67c4a76b6cd03de94d862227ff2.png") 
      .setDescription(descpages[descpage-1])
      
    message.channel.send(embed).then(msg => { 
     
      msg.react('⏪').then( r => { 
        msg.react('⏩') 
       
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id; 
       
        const backwards = msg.createReactionCollector(backwardsFilter, { time: 1000000 }); 
        const forwards = msg.createReactionCollector(forwardsFilter, { time: 1000000 }); 
       
        
        backwards.on('collect', r => { 
          if (descpage === 1) return; 
          descpage--;
          embed.setDescription(descpages[descpage-1]);
          embed.setFooter(`Pages ${descpage} of ${descpages.length}`); 
          msg.edit(embed) 
        })
       
        forwards.on('collect', r => { 
          if (descpage === descpages.length) return; 
          descpage++;
          embed.setDescription(descpages[descpage-1]);
          embed.setFooter(`Pages ${descpage} of ${descpages.length}`); 
          msg.edit(embed) 
        })
        
      })
      msg.delete(1000000)
   
    })
  } else {
    // Show individual command's help.
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return;
      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}`, {code:"asciidoc"});
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "User"
};

exports.help = {
  name: "help",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};

