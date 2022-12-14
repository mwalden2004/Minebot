import { DiscordPermissionsBitwiseFlags, ExportType } from "../types/CommandExports";
import { ApplicationCommandOptionType } from "discord.js";
const command: ExportType = {
    name: 'setnickname',
    description: 'Set the verified nickname template for your members',
    options: [
        {
            type: ApplicationCommandOptionType.Role,
            name: 'template',
            description: 'Choices for templates: %username%',
            required: true
        },
    ],
    dm_permission: false,
    default_member_permissions: DiscordPermissionsBitwiseFlags.ADMINISTRATOR,
    executor: async (interaction) => {
        if (!interaction.guild){
            return false;
        }
        const template = interaction.options.getString('template');

    }
}

export default command