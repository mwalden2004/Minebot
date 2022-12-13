import { ExportType } from "../types/CommandExports";
import { v4 } from 'uuid';
import EmbedCreator from "../utils/EmbedCreator";
import { ApplicationCommandOptionType } from "discord.js";
import { UsernameToUUID } from "../utils/Minecraft";
import { PendingVerifications } from "../entities/PendingVerifications.entity";

const command: ExportType = {
    name: 'verify',
    description: 'Link your Minecraft account with Discord!',
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'username',
            description: 'Enter your Minecraft username',
            required: true
        },
    ],
    executor: async (interaction) => {
        const username = interaction.options.getString('username') as string;
        const findUuid = await UsernameToUUID(username);
        if (typeof(findUuid) !== 'string') {
            return await interaction.reply({embeds:[EmbedCreator({title: 'We could not find your Minecraft account', color: 'Red'})]});
        }
        const verificationCode = v4();
        const newEmbed = EmbedCreator({title: 'Verification Instructions'});
        newEmbed.addFields({
            name: 'Step 1: Join our 1.19.2 Verification Server',
            value: 'verify.minebot.app'
        }, {
            name: 'Step 2: Enter the command below to verify',
            value: `/verify ${verificationCode}`
        }, {
            name: 'Step 3: Return here to finish verifying',
            value: 'Confirm you were successfully verified.'
        })

        const newPendingVerification = new PendingVerifications();
        newPendingVerification.uuid = findUuid;
        newPendingVerification.discordId = interaction.user.id;
        newPendingVerification.verificationCode = verificationCode;
        newPendingVerification.created = new Date();
        await newPendingVerification.save();

        await interaction.reply({embeds:[newEmbed]});
    }
}

export default command