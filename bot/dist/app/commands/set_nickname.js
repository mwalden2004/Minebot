"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandExports_1 = require("../types/CommandExports");
const discord_js_1 = require("discord.js");
const command = {
    name: 'setnickname',
    description: 'Set the verified nickname template for your members',
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.Role,
            name: 'template',
            description: 'Choices for templates: %username%',
            required: true
        },
    ],
    dm_permission: false,
    default_member_permissions: CommandExports_1.DiscordPermissionsBitwiseFlags.ADMINISTRATOR,
    executor: async (interaction) => {
        if (!interaction.guild) {
            return false;
        }
        const template = interaction.options.getString('template');
    }
};
exports.default = command;
//# sourceMappingURL=set_nickname.js.map