import { Client } from 'discord.js';
import GuildCreate from './events/guildCreate';
import GuildDelete from './events/guildDelete';
import InteractionCreate from './events/interactionCreate';
import Ready from './events/ready';
import initalizeCommands from './utils/InitalizeCommands';

const TOKEN = process.env.DISCORD_TOKEN as string;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID as string;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET as string;


export default async function StartDiscordBot(): Promise<void> {

    const client = new Client({
        intents: ['GuildMembers']
    });

    const commands = await initalizeCommands(TOKEN, CLIENT_ID);

    client.on('ready', () => { Ready(client); })
    client.on('interactionCreate', (interaction) => { InteractionCreate(interaction, commands) });
    client.on('guildCreate', GuildCreate)
    client.on('guildDelete', GuildDelete)


    client.login(TOKEN);
}