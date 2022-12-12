"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
function StartDiscordBot() {
    const client = new discord_js_1.Client({
        intents: ['GuildMembers']
    });
    client.on('login', () => {
        console.log(`${client.user?.username} Online`);
    });
    client.login(process.env.DISCORD_TOKEN);
}
exports.default = StartDiscordBot;
//# sourceMappingURL=bot.js.map