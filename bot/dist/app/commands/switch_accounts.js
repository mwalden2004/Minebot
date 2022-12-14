"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command = {
    name: 'switchaccount',
    description: 'Switch your primary linked Minecraft account',
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: 'username',
            description: 'Enter the username of the account you\'d like to switch to, that you have already verfied with',
            required: true
        },
    ],
    executor: async (interaction) => {
    }
};
exports.default = command;
//# sourceMappingURL=switch_accounts.js.map