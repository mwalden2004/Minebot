import { ActivityType } from "discord.js";
import { Guilds } from "../entities";

export default async function Ready(client): Promise<void> {
    if (!client.user) {
        return;
    }
    client.user.setActivity('minebot.app', { type: ActivityType.Watching });
    console.log(`${client.user?.username} Online`);


    // Add servers we've not yet "found," usually because the bot was offline when joined.
    const AllGuildsByID = client.guilds.cache.map(guild => guild);

    for (const guild of AllGuildsByID) {
        // Check if the Guild already exists in our database.
        const guildExists = await Guilds.findOne({ where: { guildId: guild.id } });
        if (!guildExists) {
            // Get information about the guild from Discord API
            await guild.fetch();

            // Create new guild in database.
            const newGuild = new Guilds();
            newGuild.guildId = guild.id;
            newGuild.inServer = true;
            newGuild.created = new Date();
            await newGuild.save();
        }
    }


}