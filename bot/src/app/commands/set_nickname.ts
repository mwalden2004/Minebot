import { DiscordPermissionsBitwiseFlags, ExportType } from "../types/CommandExports";
import { ApplicationCommandOptionType, Guild } from "discord.js";
import { Guilds } from "../entities";
import EmbedCreator from "../utils/EmbedCreator";
const command: ExportType = {
    name: 'setnickname',
    description: 'Set the verified nickname template for your members',
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'template',
            description: 'Choices for templates: {minecraft-name} {discord-name}',
            required: true
        },
    ],
    dm_permission: false,
    default_member_permissions: DiscordPermissionsBitwiseFlags.ADMINISTRATOR,
    executor: async (interaction) => {
        if (!interaction.guild){
            return false;
        }
        const template = interaction.options.getString('template', true);

        const guild = await Guilds.findOne({where:{guildId: interaction.guild.id}});
        if (!guild){
            return false;
        }

        guild.nicknameTemplate = template;
        await guild.save();


        await interaction.reply({ephemeral: true, embeds: [EmbedCreator({title: `Successfully updated your nickname template to ${template}`})]})

    }
}

export default command