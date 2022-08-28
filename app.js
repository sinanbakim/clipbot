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
    log: { enabled: false },
    onAuthenticationFailure
};

const { Chat, Api } = require("twitch-js");
const { Client, ComponentType, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, GatewayIntentBits, Partials } = require('discord.js');
const Core = require('./core.js');

var twitchChannel = process.env.TWITCH_CHANNEL_NAME;
var accessToken;
var twitchChat;
var twitchApi;
var discordChannel;
var pollMessage;


//https://twitchtokengenerator.com/api/refresh/<REFRESH_TOKEN>



buildClipEntry = () => {
    return new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Some title')
	.setURL('https://clips.twitch.tv/OutstandingEagerPandaOhMyDog-HLrwACuRLVmNtcgP')
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://clips.twitch.tv/OutstandingEagerPandaOhMyDog-HLrwACuRLVmNtcgP')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('https://clips.twitch.tv/OutstandingEagerPandaOhMyDog-HLrwACuRLVmNtcgP')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
};

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



//initTwitchChatRoutine();
initTwitchApiRoutine();

var client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent
    ],
    presence: {
        status: "invisible"
    },
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.Reaction,
        Partials.User
    ]
});

    

const getDiscordChannelByName = async(channelName) => {
    return Promise.resolve(client.channels.cache.find(channel => channel.name === channelName));
};





client.once('ready', async() => {
    console.log('Ready!');
    //const guild = client.guilds.cache.get();
    discordChannel = await getDiscordChannelByName("bot");
    //discordChannel.send({ embeds: [buildClipEntry()] });
    //message = discordChannel.send("hallo");
    //console.log(message);
    

});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('yes')
					.setLabel('publish')
					.setStyle(ButtonStyle.Primary),
			).addComponents(
				new ButtonBuilder()
					.setCustomId('no')
					.setLabel('private')
					.setStyle(ButtonStyle.Primary),
			);
        pollMessage = await interaction.reply({ content: 'Pong!', components: [row] });
        
    } else if (commandName === 'server') {
        await interaction.reply('Server info.');
    } else if (commandName === 'user') {
        await interaction.reply('User info.');
    }
});
/*
client.on('interactionCreate', async interaction => {
    const filter = i => {
        i.deferUpdate();
        return i.user.id === interaction.user.id;
    };

    pollMessage.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 60000 })
        .then(interaction => interaction.editReply(`You selected ${interaction.values.join(', ')}!`))
        .catch(err => console.log(`No interactions were collected.`));
});
*/
client.on('interactionCreate', async interaction => {
    if (interaction.customId === "yes") {
        interaction.reply(`${interaction.user.id} clicked on the ${interaction.customId} button.`);
    }
    if (interaction.customId === "no") {
        interaction.reply({ content: `These buttons aren't for you!`, ephemeral: true });
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'react') {
        const quiz = require('./quiz.json');
        // ...
        const item = quiz[Math.floor(Math.random() * quiz.length)];
        const filter = response => {
            return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
        };
        
        interaction.reply({ content: item.question, fetchReply: true })
            .then(() => {
                interaction.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        interaction.followUp(`${collected.first().author} got the correct answer!`);
                    })
                    .catch(collected => {
                        interaction.followUp('Looks like nobody got the answer this time.');
                    });
            });
    }
});

client.on('messageCreate', async message => {
    console.log(message.content);
    

});

client.login(process.env.DISCORD_BOT_TOKEN);

/*
const O = new Core(twitchApi, client, process.env);
O.initCore();

O.fetchAllClips()
  .then(
    (clips) => {
      console.log(clips.length);
    }
  );
*/




