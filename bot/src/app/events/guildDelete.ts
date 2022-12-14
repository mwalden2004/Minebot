import { Guild } from "discord.js";
import { Guilds } from "../entities";

export default async function GuildDelete(guild: Guild): Promise<void> {
    let guildExists = await Guilds.findOne({ where: { guildId: guild.id } });
    if (!guildExists) {
        // Get information about the guild from Discord API
        await guild.fetch();

        // Create new guild in database.
        guildExists = new Guilds();
        guildExists.guildId = guild.id;
        guildExists.created = new Date();
    }
    guildExists.inServer = false;
    await guildExists.save();
}