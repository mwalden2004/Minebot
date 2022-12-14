"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../entities");
const EmbedCreator_1 = require("../utils/EmbedCreator");
async function FinishedVerifyingButton(interaction) {
    // Find any existing pending verifications in the database
    const discordId = interaction.user.id;
    const foundPending = await entities_1.PendingVerifications.findOne({ where: { discordId } });
    // If we couldn't find any, we'll reply with an error telling them we couldn't find it.
    if (!foundPending) {
        return interaction.reply({ embeds: [(0, EmbedCreator_1.default)({ title: 'We could not find your verification', description: 'Please use the /verify command, then try again.', color: 'Red' })] });
    }
    // If we found the verification, but the user did not finish verifying then we will prompt them to try again.
    if (!foundPending.verified) {
        return interaction.reply({ embeds: [(0, EmbedCreator_1.default)({ title: 'You did not finish verifying', description: 'Please follow the instructions, then try again.', color: 'Red' })] });
    }
    // Find the users account
    let foundUser = await entities_1.Users.findOne({ where: { discordId } });
    // Or create one if it does not exist
    if (!foundUser) {
        foundUser = new entities_1.Users();
        foundUser.discordId = interaction.user.id;
        foundUser.accounts = {};
        foundUser.created = new Date();
    }
    // Add the users new account, and then save it.
    foundUser.accounts[foundPending.uuid] = { guilds: [] };
    await foundUser.save();
    await foundPending.remove();
    // Tell the user it was successfull.
    return interaction.reply({ embeds: [(0, EmbedCreator_1.default)({ title: 'Thank you for verifying!', description: 'You have been successfully verified!', color: 'Green' })] });
}
exports.default = FinishedVerifyingButton;
//# sourceMappingURL=finishedVeifying.js.map