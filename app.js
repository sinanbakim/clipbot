
require('dotenv').config();
const dcChID = process.env.DISCORD_CHANNEL_ID;
const twitchUsername = process.env.USERNAME;
const twitchToken = process.env.TWITCH_ACCESS_TOKEN;
const twitchChannel = process.env.TWITCH_CHANNEL_NAME;
//const http = require('http');

const twitchOptions = {
  clientId: process.env.TWITCH_CLIENT_ID,
  token: process.env.TWITCH_ACCESS_TOKEN,
  username: process.env.USERNAME,
  log: { enabled: false },
};

const { TwitchJs } = import("twitch-js");
const { Api } = new TwitchJs({options: twitchOptions});




const initTwitchChatRoutine = async () => {
  const { Chat } = new TwitchJs(twitchOptions);
  await Chat.connect();
  await Chat.join(channel);

  await Chat.on('*', (message) => {
    console.log(message);
  });
};
const initTwitchApiRoutine = async () => {
  await twitchApi.get('streams');
};

const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { Core } = require('./core.js');

initTwitchChatRoutine();
initTwitchApiRoutine();

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

O = new Core(twitchApi, client, process.env);

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





//({ token: twToken, clientId: twClientID });




// Provide your username and token secret keys from Server Control Panel (left).
// To generate tokens, use https://twitchtokengenerator.com.



