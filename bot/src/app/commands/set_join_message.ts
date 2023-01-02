import { DiscordPermissionsBitwiseFlags, ExportType } from "../types/CommandExports";
import { ApplicationCommandOptionType, Guild } from "discord.js";
import { Guilds } from "../entities";
import EmbedCreator from "../utils/EmbedCreator";
import GuildCreate from "../events/guildCreate";
const command: ExportType = {
    name: 'setjoinmessage',
    description: 'Set a join message for your guild.',
    options: [
        {
            type: 3,
            name: 'type',
            description: 'Determine what kind of message you want to send',
            required: true,
            choices: [
                {
                    name: 'Verified Join Message',
                    value: 'verified'
                },
                {
                    name: 'Unverified Join Messages',
                    value: 'unverified'
                },
            ]
        },
        {
            type: ApplicationCommandOptionType.String,
            name: 'message',
            description: 'Leave blank to remove your message. Template options here {minecraft-name} {discord-name}',
            required: false
        },
    ],
    dm_permission: false,
    default_member_permissions: DiscordPermissionsBitwiseFlags.ADMINISTRATOR,
    executor: async (interaction) => {
        if (!interaction.guild){
            return false;
        }
        const guildId = interaction.guild.id;

        const guild = await Guilds.findOne({where:{guildId: guildId}});

        if (!guild){
            return false; // this should never happen.
        }
        const messageType = interaction.options.getString('type', true) as 'verified'|'unverified';
        const message = interaction.options.getString('message', true)||'';

        if (!guild.joinMessages){
            GuildCreate(interaction.guild);
            guild.joinMessages={
                unverified: '',
                verified: '',
            };
        };

        guild.joinMessages[messageType] = message;

        await guild.save();

        await interaction.reply({ephemeral: true,embeds: [EmbedCreator({title: `Successfully set your servers join template`})]})
    }
}

export default command