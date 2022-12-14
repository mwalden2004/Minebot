"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const finishedVeifying_1 = require("../buttons/finishedVeifying");
async function InteractionCreate(interaction, commands) {
    if (interaction.isChatInputCommand()) {
        const foundCommand = commands[interaction.commandName];
        if (foundCommand) {
            foundCommand.executor(interaction);
        }
    }
    if (interaction.isButton()) {
        if (interaction.customId == 'finishedVeifying') {
            (0, finishedVeifying_1.default)(interaction);
        }
    }
}
exports.default = InteractionCreate;
//# sourceMappingURL=interactionCreate.js.map