require('dotenv').config();

const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('react').setDescription('Replies with emotes.'),
	new SlashCommandBuilder().setName('cliplist').setDescription('Shows all clips and the states of publishing.'),
	new SlashCommandBuilder().setName('clipreset').setDescription('Resets the published status of all clips.'),
	new SlashCommandBuilder().setName('clipchannel')
		.setDescription('Set a channel ID to publish new clips there.')
		.addStringOption(option =>
			option.setName('channel')
			.setDescription('The ID from the channel you want to publish your clips to.')
			.setRequired(true)),
	new SlashCommandBuilder().setName('clipstream')
		.setDescription('Set a twitch streamer name to get clips from.')
		.addStringOption(option =>
			option.setName('stream')
			.setDescription('The name of the twitch streamer where you want to get clips from.')
			.setRequired(true)),
	new SlashCommandBuilder().setName('clipinterval')
		.setDescription('Set a number between 15 and 1440 (in minutes) the clipbot is looking for new clips.')
		.addIntegerOption(option =>
			option.setName('minutes')
			.setDescription('The interval to looking up for new clips. [15 < x < 1440 / in minutes]')
			.setRequired(true))
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);