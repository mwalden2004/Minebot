import { ExportType } from "../types/CommandExports";
import { v4 } from 'uuid';
import EmbedCreator from "../utils/EmbedCreator";
import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle } from "discord.js";
import { UsernameToUUID } from "../utils/Minecraft";
import { PendingVerifications } from "../entities/PendingVerifications.entity";
import { Users } from "../entities";

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
        // Find the Minecraft users UUID, and ensure the account actually exists.
        const username = interaction.options.getString('username', true) as string;
        const findUuid = await UsernameToUUID(username);
        if (typeof(findUuid) !== 'string') {
            return await interaction.reply({embeds:[EmbedCreator({title: 'We could not find your Minecraft account', color: 'Red'})]});
        }
        // Generate a unique-id for the verification code, and give the user the instructions to verify.
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


        // Add our pending verification to our database.
        const newPendingVerification = new PendingVerifications();
        newPendingVerification.uuid = findUuid;
        newPendingVerification.discordId = interaction.user.id;
        newPendingVerification.verificationCode = verificationCode;
        newPendingVerification.created = new Date();
        await newPendingVerification.save();

        // If the user does not have an account, we will go ahead and create one.
        const foundUser = await Users.findOne({where:{discordId: interaction.user.id}});
        if (!foundUser){
            const newUser = new Users();
            newUser.discordId = interaction.user.id;
            newUser.accounts = {accounts: [], links: {}};
            newUser.created = new Date();
            await newUser.save();
        }

        // Create the "I've finished verifying" button, and send the reply to the interaction.

        const finishedVerifyingButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('finishedVeifying').setLabel('I\'ve Finished Verifying').setStyle(ButtonStyle.Success),
        );

        await interaction.reply({
            embeds:[newEmbed],
            //@ts-expect-error ?
            components: [finishedVerifyingButton],
            ephemeral: true
        });
    }
}

export default command