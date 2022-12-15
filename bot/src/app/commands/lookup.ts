import { ApplicationCommandOptionType } from 'discord.js';
import fetch from 'node-fetch';
import { ExportType } from "../types/CommandExports";
import EmbedCreator from '../utils/EmbedCreator';
import { UsernameToUUID, UUIDtoUsername } from '../utils/Minecraft'

const command: ExportType = {
    name: 'lookup',
    description: 'Look up a Minecraft user by name, or uuid.',
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'username',
            description: 'The Minecraft username to look up.'
        },
        {
            type: ApplicationCommandOptionType.String,
            name: 'uuid',
            description: 'The Minecraft user UUID to look up.'
        }
    ],
    executor: async (interaction) => {
        const name = interaction.options.getString('username');
        const uuid = interaction.options.getString('uuid');

        if (name){
            const found_uuid = await UsernameToUUID(name);
            const embed = EmbedCreator({title: name});
            embed.addFields({
                name: 'Username',
                value: name.toString()
            });
            embed.addFields({
                name: 'UUID',
                value: found_uuid.toString()
            });
            embed.setThumbnail(`https://crafatar.com/avatars/${found_uuid}`)

            return await interaction.reply({embeds: [embed]});
        }
        if (uuid){
            const found_name = await UUIDtoUsername(uuid);

            const embed = EmbedCreator({title: found_name.toString()});
            embed.addFields({
                name: 'Username',
                value: uuid.toString()
            });
            embed.addFields({
                name: 'UUID',
                value: found_name.toString()
            });
            embed.setThumbnail(`https://crafatar.com/avatars/${uuid}`)

            return await interaction.reply({embeds: [embed]});
        }
        return interaction.reply('You must provide either a Minecraft player username, or UUID!')
    }
}

export default command