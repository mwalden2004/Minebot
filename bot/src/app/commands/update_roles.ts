import { ExportType } from "../types/CommandExports";
import { ApplicationCommandOptionType } from "discord.js";
import { UsernameToUUID } from "../utils/Minecraft";
import { Users } from "../entities";
import EmbedCreator from "../utils/EmbedCreator";
const command: ExportType = {
    name: 'updateroles',
    description: 'Update your roles and nickname in the server.',
    executor: async (interaction) => {

        return await interaction.reply({embeds:[EmbedCreator({title: `Successfully updated your roles and nickname.`, color: 'Green'})]});

    }
}

export default command