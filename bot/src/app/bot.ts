import { CacheType, Client, ChatInputCommandInteraction, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

const TOKEN = process.env.DISCORD_TOKEN as string;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID as string;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET as string;

let commands: {[name: string]: {name: string; description: string; executor: (interaction: ChatInputCommandInteraction<CacheType>) => void}} = {};

async function initalizeCommands(): Promise<void> {
    let toSend: {name: string; description: string}[] = [];
    for (const file of readdirSync(join(__dirname, '/commands'))){
        if (!file.includes('.map')){
            const command: {name: string; description: string; executor: () => void} = require(`./commands/${file}`).default;
            commands[command.name] = command;
            toSend.push({name: command.name, description: command.description})
        };
    }

    const rest = new REST({ version: '10' }).setToken(TOKEN);
    rest.put(Routes.applicationCommands(CLIENT_ID), { body: toSend }).then(() => {
        console.log(`Successfully registered commands: ${toSend.map(a=>a.name).join(", ")}`)
    }).catch((e) => {
        console.log('Something went wrong registering commands', e)
    })


}

export default async function StartDiscordBot(): Promise<void> {

    const client = new Client({
        intents: ['GuildMembers']
    });

    await initalizeCommands();
    client.on('ready', () => {
        console.log(`${client.user?.username} Online`)
    })

    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const foundCommand = commands[interaction.commandName];

        if (foundCommand) {
            foundCommand.executor(interaction);
        }
      });


    client.login(TOKEN);
}