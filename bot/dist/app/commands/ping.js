"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command = {
    name: 'ping',
    description: 'Replies with Pong!',
    executor: async (interaction) => {
        await interaction.reply('Pong!');
    }
};
exports.default = command;
//# sourceMappingURL=ping.js.map