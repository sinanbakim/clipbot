
require('dotenv').config();
const dcChID = process.env.DISCORD_CA_ALLGEMEIN_CHANNEL_ID;

const http = require('http');
const { TwitchJs, Api } = require("twitch-js");
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const core = require('./core.js');

const api = new Api({token: process.env.TWITCH_ACCESS_TOKEN, clientId: process.env.TWITCH_CLIENT_ID});

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds
  ],
  presence: {
    status: "invisible"
  },
  partials: [
    Partials.Channel
  ]
});

O = new core(api, client, process.env);

client.once('ready', () => {
	console.log('Ready!');
  const channel = client.channels.cache.get(dcChID);

});

client.on('interactionCreate', async interaction => {
  console.log(interaction);
});


//client.login(process.env.DISCORD_BOT_TOKEN);

O.fetchAllClips()
  .then(
    (clips) => {
      console.log(clips.length);
    }
  );





//const username = process.env.USERNAME;
//const token = process.env.TOKEN;
//const channel = "inuzaa";

//({ token: twToken, clientId: twClientID });




// Provide your username and token secret keys from Server Control Panel (left).
// To generate tokens, use https://twitchtokengenerator.com.

/*
const run = async () => {
  const chat = new Chat({
    username,
    token
  });

  await chat.connect();
  await chat.join(channel);

  chat.on(ChatEvents.SUBSCRIPTION, (message) => {
    // Do stuff ...
  });
};

run();
*/