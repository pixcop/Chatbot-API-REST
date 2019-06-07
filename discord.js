  const discord = require('discord.js');
  const ChatInterface = require("./ChatInterface.js");

  // Create an instance of a Discord client
  const client = new discord.Client();

var Discord = function runChat(){
  //After this bot start reacting to information received from Discord
  client.on('ready', () => {
    console.log('Discord ready !');
  });

  client.on('message', message => {

    //bot ignore himself
    if(message.author.bot) return;


    chatInterface.getRivescript().sortReplies();
    // using promises
    chatInterface.getRivescript().reply("Username", message.content).then(function(reply) {
        message.channel.send(reply);
    }).catch(function(error){
      console.log("error : Promise not working");
    });

  });

  //Log our bot in using the token from https://discordapp.com/developers/applications/me
  client.login(chatInterface.getUser().token);

};

var DiscordDelete = function stopChat(){
  client.destroy();
};

module.exports.runChat = Discord;
module.exports.stopChat = DiscordDelete;


