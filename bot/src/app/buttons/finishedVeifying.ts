import { ButtonInteraction, User } from "discord.js";
import { PendingVerifications, Users, VerfiedUsers } from "../entities";
import EmbedCreator from "../utils/EmbedCreator";
import UpdateGuildMember from "../utils/UpdateGuildMember";

export default async function FinishedVerifyingButton(interaction: ButtonInteraction): Promise<any> {
    if (!interaction.guild){
        return;
    }

    // Find any existing pending verifications in the database
    const discordId = interaction.user.id;
    const foundPending = await PendingVerifications.findOne({where: {discordId}});

    // If we couldn't find any, we'll reply with an error telling them we couldn't find it.
    if (!foundPending) {
        return interaction.reply({ephemeral: true, embeds: [EmbedCreator({title: 'We could not find your verification', description: 'Please use the /verify command, then try again.', color: 'Red'})]})
    }

    const minecraftUUID = foundPending.uuid;

    // If we found the verification, but the user did not finish verifying then we will prompt them to try again.
    if (!foundPending.verified){
        return interaction.reply({ephemeral: true, embeds: [EmbedCreator({title: 'You did not finish verifying', description: 'Please follow the instructions, then try again.', color: 'Red'})]})
    }

    // Find the users account
    let foundUser = await Users.findOne({where: {discordId}});

    // Or create one if it does not exist
    if (!foundUser) {
        foundUser = new Users();
        foundUser.discordId = interaction.user.id;
        foundUser.accounts = {accounts: [], links: {}};
        foundUser.created = new Date();
    }

    // Add the users new account, and then save it.
    foundUser.accounts.accounts.push(minecraftUUID)
    if (!foundUser.mainAccount){
        foundUser.mainAccount=minecraftUUID;
    }

    // Add functionality for reverse look ups :)
    let existingVerifiedUser = await VerfiedUsers.findOne({where:{minecraftUUID}});
    if (!existingVerifiedUser){
        existingVerifiedUser = new VerfiedUsers();
        existingVerifiedUser.minecraftUUID = minecraftUUID;
        existingVerifiedUser.accounts=[];
    }
    existingVerifiedUser.accounts.push(interaction.user.id);

    await foundUser.save();
    await existingVerifiedUser.save();
    await foundPending.remove();

    // Tell the user it was successfull.
    const guildMember = await interaction.guild.members.fetch(interaction.user.id);
    if (guildMember){
        UpdateGuildMember(guildMember);
    }
    return interaction.reply({ephemeral: true, embeds: [EmbedCreator({title: 'Thank you for verifying!', description: 'You have been successfully verified!', color: 'Green'})]})

}