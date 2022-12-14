import { ExportType } from "../types/CommandExports";
import { ApplicationCommandOptionType } from "discord.js";
const command: ExportType = {
    name: 'switchaccount',
    description: 'Switch your primary linked Minecraft account',
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'username',
            description: 'Enter the username of the account you\'d like to switch to, that you have already verfied with',
            required: true
        },
    ],
    executor: async (interaction) => {

    }
}

export default command