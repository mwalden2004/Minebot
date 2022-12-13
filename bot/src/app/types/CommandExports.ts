import { ApplicationCommandOptionData, CacheType, ChatInputCommandInteraction } from "discord.js";

export type ExportType = {
    name: string; description: string; options?: any; executor: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<any>;
}