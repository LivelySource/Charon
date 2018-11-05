
if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");


const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const mongoose = require("mongoose");
//Establishing a connection with MongoDB...
mongoose.connect(process.env.reports, {
  useNewUrlParser: true 
});

// In the future I probably should change it to charon.whatever rather than client.whatever
const client = new Discord.Client();


client.config = require("./config.js");

const Odols = require("./model/odols.js")

require("./modules/functions.js")(client);


client.commands = new Enmap();
client.aliases = new Enmap();




client.settings = new Enmap({provider: new EnmapLevel({name: "settings"})});

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};


//Odols Currency
client.on("message", (message) => {
  (message.content.endsWith("."))
  let odolstoadd = Math.ceil(Math.random() * 1);
  console.log(odolstoadd + "odols")
  Odols.findOne({user: message.author.username, userID: message.author.id, server: message.guild.name, serverID: message.guild.id}, (err, odols) =>{
    if(err) console.log(err)
    if(!odols){
      const newOdols = new Odols({
        user: message.author.username,
        userID: message.author.id,
        server: message.guild.name,
        serverID: message.guild.id,
        odols: odolstoadd
      })

      newOdols.save().catch(err => console.log(err));
    }else {
      odols.odols = odols.odols + odolstoadd;
      odols.save().catch(err => console.log(err));
    }
  })
});

//--------------------------------//
// Loading + Func
const init = async () => {

  
  const cmdFiles = await readdir("./commands/");
  client.log("log", `Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });
  const evtFiles = await readdir("./events/");
  client.log("log", `Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  // Pranked yeah look in config.token lol
  client.login(client.config.token);


};

init();
