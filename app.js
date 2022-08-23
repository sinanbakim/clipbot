require('dotenv').config();
const fetchUtil = require('twitch-js/lib/utils/fetch');
const dcChID = process.env.DISCORD_CHANNEL_ID;
const twitchUsername = process.env.USERNAME;
const twitchToken = process.env.TWITCH_ACCESS_TOKEN;

//const http = require('http');

const onAuthenticationFailure = () =>
  fetchUtil('https://id.twitch.tv/oauth2/token', {
    method: 'post',
    search: {
      grant_type: 'refresh_token',
      refresh_token: process.env.TWITCH_REFRESH_TOKEN,
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
    },
  }).then((response) => {
    accessToken = response.accessToken;
  });

var twitchOptions = {
    clientId: process.env.TWITCH_CLIENT_ID,
    token: process.env.TWITCH_ACCESS_TOKEN,
    username: process.env.TWITCH_USERNAME,
    log: { enabled: true },
    onAuthenticationFailure
};

const { Chat, Api } = require("twitch-js");
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const Core = require('./core.js');

var twitchChannel = process.env.TWITCH_CHANNEL_NAME;
var accessToken;
var twitchChat;
var twitchApi;
var O;

https://twitchtokengenerator.com/api/refresh/<REFRESH_TOKEN>



initTwitchChatRoutine = async() => {
    twitchChat = new Chat(twitchOptions);
    await twitchChat.connect();
    await twitchChat.join(twitchChannel);

    twitchChat.on('*', (messages) => {
        if (messages.message === "hi") {
            twitchChat.say(twitchChannel, "hi back");
        }
        console.log(messages);
    });
};

initTwitchApiRoutine = async() => {
    twitchApi = new Api(twitchOptions);
    await twitchApi.get('streams');
};



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

const initCore = async() => {
    O = new Core(twitchApi, client, process.env);
};

initCore();


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