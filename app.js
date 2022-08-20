
require('dotenv').config();
const dcChID = process.env.DISCORD_CHANNEL_ID;

//const http = require('http');
const { Api, Chat } = require("twitch-js");
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
  //const guild = client.guilds.cache.get();
  const channel = client.channels.cache.find(channel => channel.name === "bot");
  //console.log(channel);
  

  
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'react') {
		const message = await interaction.reply({ content: 'You can react with Unicode emojis!', fetchReply: true });
		message.react('😄');
	}
});

client.login(process.env.DISCORD_BOT_TOKEN);

/*
O.fetchAllClips()
  .then(
    (clips) => {
      console.log(clips.length);
    }
  );
*/



const twitchUsername = process.env.USERNAME;
const twitchToken = process.env.TWITCH_CHAT_TOKEN;
const channel = process.env.TWITCH_CHANNEL_NAME;

//({ token: twToken, clientId: twClientID });




// Provide your username and token secret keys from Server Control Panel (left).
// To generate tokens, use https://twitchtokengenerator.com.


const run = async () => {
  const chat = new Chat({
    twitchUsername,
    twitchToken
  });

  chat.connect();
  chat.join(channel);

  chat.on('*', (message) => {
    console.log(message);
  });
};

run();
