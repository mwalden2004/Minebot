import { ExportType } from "../types/CommandExports";
import { ApplicationCommandOptionType } from "discord.js";
import { UsernameToUUID } from "../utils/Minecraft";
import { Users } from "../entities";
import EmbedCreator from "../utils/EmbedCreator";
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
        const username = interaction.options.getString('username', true);
        const uuid = await UsernameToUUID(username);
        if (typeof(uuid) !== 'string') {
            return await interaction.reply({embeds:[EmbedCreator({title: 'We could not find your Minecraft account', color: 'Red'})]});
        }

        const userAccount = await Users.findOne({where:{discordId: interaction.user.id}});
        if (!userAccount) {
            return await interaction.reply({embeds:[EmbedCreator({title: 'You must verify before you can use this command!', color: 'Red'})]});
        }

        if (!userAccount.accounts[uuid]){
            return await interaction.reply({embeds:[EmbedCreator({title: `You must verify with ${username} before you can use this command!`, color: 'Red'})]});
        }

        userAccount.mainAccount = uuid;
        await userAccount.save();
        return await interaction.reply({embeds:[EmbedCreator({title: `Successfully changed your primary verified account`, color: 'Green'})]});

    }
}

export default command