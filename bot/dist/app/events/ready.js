"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
async function Ready(client) {
    if (!client.user) {
        return;
    }
    client.user.setActivity('minebot.app', { type: discord_js_1.ActivityType.Watching });
    console.log(`${client.user?.username} Online`);
}
exports.default = Ready;
//# sourceMappingURL=ready.js.map