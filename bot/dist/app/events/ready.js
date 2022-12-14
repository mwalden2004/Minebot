"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const entities_1 = require("../entities");
async function Ready(client) {
    if (!client.user) {
        return;
    }
    client.user.setActivity('minebot.app', { type: discord_js_1.ActivityType.Watching });
    console.log(`${client.user?.username} Online`);
    // Add servers we've not yet "found," usually because the bot was offline when joined.
    const AllGuildsByID = client.guilds.cache.map(guild => guild);
    for (const guild of AllGuildsByID) {
        // Check if the Guild already exists in our database.
        const guildExists = await entities_1.Guilds.findOne({ where: { guildId: guild.id } });
        if (!guildExists) {
            // Get information about the guild from Discord API
            await guild.fetch();
            // Create new guild in database.
            const newGuild = new entities_1.Guilds();
            newGuild.guildId = guild.id;
            newGuild.inServer = true;
            newGuild.created = new Date();
            await newGuild.save();
        }
    }
}
exports.default = Ready;
//# sourceMappingURL=ready.js.map