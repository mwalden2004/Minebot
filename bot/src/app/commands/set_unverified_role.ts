import { DiscordPermissionsBitwiseFlags, ExportType } from "../types/CommandExports";
import { ApplicationCommandOptionType, Guild } from "discord.js";
import { Guilds } from "../entities";
import EmbedCreator from "../utils/EmbedCreator";
import GuildCreate from "../events/guildCreate";
const command: ExportType = {
    name: 'setunverifiedrole',
    description: 'Set the verified role for your server',
    options: [
        {
            type: ApplicationCommandOptionType.Role,
            name: 'role',
            description: 'Choose a role to automatically give to unverified users',
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

        let guild = await Guilds.findOne({where:{guildId: interaction.guild.id}});
        if (!guild){
            await GuildCreate(interaction.guild);
            guild = await Guilds.findOne({where:{guildId: interaction.guild.id}});
        }
        if (!guild){
            return false;
        }


        guild.unverifiedRole = role.id;
        await guild.save();

        await interaction.reply({ephemeral: true,embeds: [EmbedCreator({title: `Successfully updated your unverified role to ${role.name}`})]})
    }
}

export default command