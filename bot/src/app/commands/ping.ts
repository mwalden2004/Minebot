import { CacheType, ChatInputCommandInteraction } from "discord.js";

export default {
    name: 'ping',
    description: 'Replies with Pong!',
    executor: async (interaction: ChatInputCommandInteraction<CacheType>) => {
        await interaction.reply('Pong!');

    }
}