"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../entities");
async function GuildDelete(guild) {
    let guildExists = await entities_1.Guilds.findOne({ where: { guildId: guild.id } });
    if (!guildExists) {
        // Get information about the guild from Discord API
        await guild.fetch();
        // Create new guild in database.
        guildExists = new entities_1.Guilds();
        guildExists.guildId = guild.id;
        guildExists.created = new Date();
    }
    guildExists.inServer = false;
    await guildExists.save();
}
exports.default = GuildDelete;
//# sourceMappingURL=guildDelete.js.map