"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandExports_1 = require("../types/CommandExports");
const discord_js_1 = require("discord.js");
const EmbedCreator_1 = require("../utils/EmbedCreator");
const entities_1 = require("../entities");
const command = {
    name: 'setverifiedrole',
    description: 'Set the verified role for your server',
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.Role,
            name: 'role',
            description: 'Choose a role to automatically give to verified users',
            required: true
        },
    ],
    dm_permission: false,
    default_member_permissions: CommandExports_1.DiscordPermissionsBitwiseFlags.ADMINISTRATOR,
    executor: async (interaction) => {
        if (!interaction.guild) {
            return false;
        }
        const role = interaction.options.getRole('role');
        const guildId = interaction.guild.id;
        const guild = await entities_1.Guilds.findOne({ where: { guildId: guildId } });
        if (!guild || !role) {
            return false; // this should never happen.
        }
        guild.verifiedRole = role.id;
        await guild.save();
        await interaction.reply({ embeds: [(0, EmbedCreator_1.default)({ title: `Successfully updated your verified role to ${role.name}` })] });
    }
};
exports.default = command;
//# sourceMappingURL=set_verified_role.js.map