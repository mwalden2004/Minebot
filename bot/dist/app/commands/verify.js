"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const EmbedCreator_1 = require("../utils/EmbedCreator");
const discord_js_1 = require("discord.js");
const Minecraft_1 = require("../utils/Minecraft");
const PendingVerifications_entity_1 = require("../entities/PendingVerifications.entity");
const command = {
    name: 'verify',
    description: 'Link your Minecraft account with Discord!',
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: 'username',
            description: 'Enter your Minecraft username',
            required: true
        },
    ],
    executor: async (interaction) => {
        const username = interaction.options.getString('username');
        const findUuid = await (0, Minecraft_1.UsernameToUUID)(username);
        if (typeof (findUuid) !== 'string') {
            return await interaction.reply({ embeds: [(0, EmbedCreator_1.default)({ title: 'We could not find your Minecraft account', color: 'Red' })] });
        }
        const verificationCode = (0, uuid_1.v4)();
        const newEmbed = (0, EmbedCreator_1.default)({ title: 'Verification Instructions' });
        newEmbed.addFields({
            name: 'Step 1: Join our 1.19.2 Verification Server',
            value: 'verify.minebot.app'
        }, {
            name: 'Step 2: Enter the command below to verify',
            value: `/verify ${verificationCode}`
        }, {
            name: 'Step 3: Return here to finish verifying',
            value: 'Confirm you were successfully verified.'
        });
        const newPendingVerification = new PendingVerifications_entity_1.PendingVerifications();
        newPendingVerification.uuid = findUuid;
        newPendingVerification.discordId = interaction.user.id;
        newPendingVerification.verificationCode = verificationCode;
        newPendingVerification.created = new Date();
        await newPendingVerification.save();
        await interaction.reply({ embeds: [newEmbed] });
    }
};
exports.default = command;
//# sourceMappingURL=verify.js.map