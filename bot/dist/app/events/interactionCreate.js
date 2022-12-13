"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function InteractionCreate(interaction, commands) {
    if (!interaction.isChatInputCommand())
        return;
    const foundCommand = commands[interaction.commandName];
    if (foundCommand) {
        foundCommand.executor(interaction);
    }
}
exports.default = InteractionCreate;
//# sourceMappingURL=interactionCreate.js.map