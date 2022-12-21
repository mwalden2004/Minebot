import { ExportType } from "../types/CommandExports";
import { v4 } from 'uuid';
import EmbedCreator from "../utils/EmbedCreator";
import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, verifyString } from "discord.js";
import { UsernameToUUID } from "../utils/Minecraft";
import { PendingVerifications } from "../entities/PendingVerifications.entity";
import { Users, VerfiedUsers } from "../entities";

const command: ExportType = {
    name: 'unverify',
    description: 'Remove your Minecraft account verification',
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'username',
            description: 'Enter your Minecraft username you want to unverify from',
            required: true
        },
    ],
    executor: async (interaction) => {
        // Find the Minecraft users UUID, and ensure the account actually exists.
        const username = interaction.options.getString('username', true) as string;
        const findUuid = await UsernameToUUID(username);
        if (typeof(findUuid) !== 'string') {
            return await interaction.reply({embeds:[EmbedCreator({title: 'We could not find your Minecraft account', color: 'Red'})]});
        }

        const user = await Users.findOne({where:{discordId: interaction.user.id}});
        if (!user){
            return await interaction.reply({
                embeds:[EmbedCreator({title: 'You are not verified with any accounts.', color: 'Red'})],
                ephemeral: true
            });
        }

        if (user.accounts.accounts.includes(findUuid)){
            user.accounts.accounts=user.accounts.accounts.filter(a=>a!==findUuid);
            const foundAccount = await VerfiedUsers.findOne({where:{minecraftUUID: findUuid}})
            if (foundAccount){
                foundAccount.accounts=foundAccount.accounts.filter(a=>a!==interaction.user.id);
                await foundAccount.save();
            }
            await user.save();
        }else{
            return await interaction.reply({
                embeds:[EmbedCreator({title: 'You are not verified to that account', color: 'Red'})],
                ephemeral: true
            });
        }

        return await interaction.reply({
            embeds:[EmbedCreator({title: 'Successfully removed your verification', color: 'Green'})],
            ephemeral: true
        });
    }
}

export default command