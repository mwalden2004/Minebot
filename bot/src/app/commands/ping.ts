import { ExportType } from "../types/CommandExports";

const command: ExportType = {
    name: 'ping',
    description: 'Replies with Pong!',
    executor: async (interaction) => {
        await interaction.reply('Pong!');
    }
}

export default command