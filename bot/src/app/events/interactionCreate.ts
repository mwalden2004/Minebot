export default async function InteractionCreate(interaction, commands): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    const foundCommand = commands[interaction.commandName];

    if (foundCommand) {
        foundCommand.executor(interaction);
    }
}