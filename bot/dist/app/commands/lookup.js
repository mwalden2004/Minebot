"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const EmbedCreator_1 = require("../utils/EmbedCreator");
const Minecraft_1 = require("../utils/Minecraft");
const command = {
    name: 'lookup',
    description: 'Look up a Minecraft user by name, or uuid.',
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: 'username',
            description: 'The Minecraft username to look up.'
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: 'uuid',
            description: 'The Minecraft user UUID to look up.'
        }
    ],
    executor: async (interaction) => {
        const name = interaction.options.getString('username');
        const uuid = interaction.options.getString('uuid');
        if (name) {
            const found_uuid = await (0, Minecraft_1.UsernameToUUID)(name);
            const embed = (0, EmbedCreator_1.default)({ title: name });
            embed.addFields({
                name: 'Username',
                value: name.toString()
            });
            embed.addFields({
                name: 'UUID',
                value: found_uuid.toString()
            });
            embed.setThumbnail(`https://crafatar.com/avatars/${found_uuid}`);
            return await interaction.reply({ embeds: [embed] });
        }
        if (uuid) {
            const found_name = await (0, Minecraft_1.UUIDtoUsername)(uuid);
            const embed = (0, EmbedCreator_1.default)({ title: found_name.toString() });
            embed.addFields({
                name: 'Username',
                value: uuid.toString()
            });
            embed.addFields({
                name: 'UUID',
                value: found_name.toString()
            });
            embed.setThumbnail(`https://crafatar.com/avatars/${uuid}`);
            return await interaction.reply({ embeds: [embed] });
        }
        return interaction.reply('You must provide either a Minecraft player username, or UUID!');
    }
};
exports.default = command;
//# sourceMappingURL=lookup.js.map