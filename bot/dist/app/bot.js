"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const path_1 = require("path");
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
let commands = {};
async function initalizeCommands() {
    let toSend = [];
    for (const file of (0, fs_1.readdirSync)((0, path_1.join)(__dirname, '/commands'))) {
        if (!file.includes('.map')) {
            const command = require(`./commands/${file}`).default;
            commands[command.name] = command;
            toSend.push({ name: command.name, description: command.description });
        }
        ;
    }
    const rest = new discord_js_1.REST({ version: '10' }).setToken(TOKEN);
    rest.put(discord_js_1.Routes.applicationCommands(CLIENT_ID), { body: toSend }).then(() => {
        console.log(`Successfully registered commands: ${toSend.map(a => a.name).join(", ")}`);
    }).catch((e) => {
        console.log('Something went wrong registering commands', e);
    });
}
async function StartDiscordBot() {
    const client = new discord_js_1.Client({
        intents: ['GuildMembers']
    });
    await initalizeCommands();
    client.on('ready', () => {
        console.log(`${client.user?.username} Online`);
    });
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand())
            return;
        const foundCommand = commands[interaction.commandName];
        if (foundCommand) {
            foundCommand.executor(interaction);
        }
    });
    client.login(TOKEN);
}
exports.default = StartDiscordBot;
//# sourceMappingURL=bot.js.map