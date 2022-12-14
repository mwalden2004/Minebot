"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const guildCreate_1 = require("./events/guildCreate");
const guildDelete_1 = require("./events/guildDelete");
const interactionCreate_1 = require("./events/interactionCreate");
const ready_1 = require("./events/ready");
const InitalizeCommands_1 = require("./utils/InitalizeCommands");
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
async function StartDiscordBot() {
    const client = new discord_js_1.Client({
        intents: ['GuildMembers']
    });
    const commands = await (0, InitalizeCommands_1.default)(TOKEN, CLIENT_ID);
    client.on('ready', () => { (0, ready_1.default)(client); });
    client.on('interactionCreate', (interaction) => { (0, interactionCreate_1.default)(interaction, commands); });
    client.on('guildCreate', guildCreate_1.default);
    client.on('guildDelete', guildDelete_1.default);
    client.login(TOKEN);
}
exports.default = StartDiscordBot;
//# sourceMappingURL=bot.js.map