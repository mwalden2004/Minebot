import { DiscordPermissionsBitwiseFlags, ExportType } from "../types/CommandExports";
import { ApplicationCommandOptionType } from "discord.js";
import EmbedCreator from "../utils/EmbedCreator";
import { Guilds } from "../entities";
const command: ExportType = {
    name: 'setverifiedrole',
    description: 'Set the verified role for your server',
    options: [
        {
            type: ApplicationCommandOptionType.Role,
            name: 'role',
            description: 'Choose a role to automatically give to verified users',
            required: true
        },
    ],
    dm_permission: false,
    default_member_permissions: DiscordPermissionsBitwiseFlags.ADMINISTRATOR,
    executor: async (interaction) => {
        if (!interaction.guild){
            return false;
        }
        const role = interaction.options.getRole('role', true);
        const guildId = interaction.guild.id;

        const guild = await Guilds.findOne({where:{guildId: guildId}});

        if (!guild){
            return false; // this should never happen.
        }

        guild.verifiedRole = role.id;
        await guild.save();

        await interaction.reply({embeds: [EmbedCreator({title: `Successfully updated your verified role to ${role.name}`})]})

    }
}

export default command