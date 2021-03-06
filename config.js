const config = {
  // Bot Manangement Permissions
  "ownerID": "171173840364371968",


  "admins": [],


  "support": [],

  // Hahaha you thought.
  "token": process.env.token,


 // Web Dashboard (Unfinished) 
  "dashboard" : {
    "oauthSecret": process.env.secret,
    "callbackURL": "localhost:3000/callback",
    "sessionSecret": process.env.secret2,
    "domain": "localhost",
    "port": 3000
  },

  
  
  "defaultSettings" : {
    "prefix": "-",
    "modLogChannel": "mod-log",
    "modRole": "Moderator",
    "adminRole": "Administrator",
    "systemNotice": "true", // This gives a notice when a user tries to run a command that they do not have permission to use.
    "welcomeChannel": "welcome",
    "welcomeMessage": "Welcome {{user}} to the Discord!",
    "welcomeEnabled": "false",
    "goodbyeChannel": "goodbye",
    "goodbyeMessage": "Goodbye {{user}} see you later!",
    "goodbyeEnabled": "false",
    "autoRole": "member",
    "autoRoleEnabled": "false"
  },

  // PERMISSION LEVEL DEFINITIONS.

  permLevels: [
    // Lowest Level
    { level: 0,
      name: "User", 
      
      check: () => true
    },

    // Discord Staff Roles 
    { level: 2,
      
      name: "Moderator",
      
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Administrator", 
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },
    // Server Owner
    { level: 4,
      name: "Server Owner", 

      check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
    },

    // Charon Support Staff
    { level: 8,
      name: "Bot Support",
      check: (message) => config.support.includes(message.author.id)
    },

    // Charon Admins have permission to reload or reboot.
    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },

  
    { level: 10,
      name: "Bot Owner", 

      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
};

module.exports = config;
