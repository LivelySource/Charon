/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.
*/

exports.run = (client, message, args, level) => {
  // If no specific command is called, show all filtered commands.
  if (!args[0]) {
    // Load guild settings (for prefixes and eventually per-guild tweaks)
    const settings = message.settings;

    // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
    const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

    // Here we have to get the command names only, and we use that array to get the longest name.
    // This make the help commands "aligned" in the output.
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let currentCategory = "";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    let output = `!========== [Charon's Commands] ==========!\n\n[Use ${settings.prefix}help <commandname> for details]`;
=======
    let output = `!==========< Charon's Commands >==========!\n\nFor any further help, direct message _Lively#0286\n\n[Use ${settings.prefix}help <commandname> for details]\n`;
>>>>>>> parent of f56e1e4... Help improved
=======
    let output = `!==========[Charon's commands]==========!\n\nFor any further help, direct message _Lively#0286\n\n[Use ${settings.prefix}help <commandname> for details]\n`;
>>>>>>> parent of fce1978... push
=======
    let output = `!========== [Charon's Commands] ==========!\n`;
>>>>>>> parent of 1797516... pust
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    sorted.forEach( c => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
<<<<<<< HEAD
        output += `\n--- ${cat} ---\n`;
=======
        output += `\n--- ${cat} ==---\n`;
>>>>>>> parent of fce1978... push
        currentCategory = cat;
      }
      output += `${settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
    });
    message.channel.send(output, {code:"asciidoc"});
  } else {
    // Show individual command's help.
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return;
      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}\nFor any further help, direct message _Lively#0286\n\n[Use ${settings.prefix}help <commandname> for details]\n\n===============================`, {code:"asciidoc"});
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
