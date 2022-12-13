import { CacheType, Client, ChatInputCommandInteraction, REST, Routes, ApplicationCommandOptionData } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import GuildCreate from './events/guildCreate';
import GuildDelete from './events/guildDelete';
import InteractionCreate from './events/interactionCreate';
import Ready from './events/ready';
import { ExportType } from './types/CommandExports';

const TOKEN = process.env.DISCORD_TOKEN as string;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID as string;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET as string;

let commands: { [name: string]: ExportType } = {};

async function initalizeCommands(): Promise<void> {
    let toSend: { name: string; description: string; options?: ApplicationCommandOptionData }[] = [];

    for (const file of readdirSync(join(__dirname, '/commands'))) {
        if (!file.includes('.map')) {
            const command: ExportType = require(`./commands/${file}`).default;
            commands[command.name] = command;
            toSend.push({ name: command.name, description: command.description, options: command.options })
        };
    }

    const rest = new REST({ version: '10' }).setToken(TOKEN);
    rest.put(Routes.applicationCommands(CLIENT_ID), { body: toSend }).then(() => {
        console.log(`Successfully registered commands: ${toSend.map(a => a.name).join(", ")}`)
    }).catch((e) => {
        console.log(`Somethinhg went wrong registering commands: ${toSend.map(a => a.name).join(", ")}`, e)
    })
}

export default async function StartDiscordBot(): Promise<void> {

    const client = new Client({
        intents: ['GuildMembers']
    });

    await initalizeCommands();

    client.on('ready', () => { Ready(client); })
    client.on('interactionCreate', (interaction) => { InteractionCreate(interaction, commands) });
    client.on('guildCreate', GuildCreate)
    client.on('guildDelete', GuildDelete)


    client.login(TOKEN);
}