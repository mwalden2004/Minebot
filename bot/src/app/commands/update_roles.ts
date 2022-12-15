import { ExportType } from "../types/CommandExports";
import { ApplicationCommandOptionType } from "discord.js";
import { UsernameToUUID } from "../utils/Minecraft";
import { Users } from "../entities";
import EmbedCreator from "../utils/EmbedCreator";
import UpdateGuildMember from "../utils/UpdateGuildMember";
const command: ExportType = {
    name: 'updateroles',
    description: 'Update your roles and nickname in the server.',
    executor: async (interaction) => {
        if (!interaction.member){
            return false;
        }

        const guild = await interaction.guild;
        const member = await guild?.members.fetch(interaction.user.id);
        if (!member){
            return false;
        }

        try{
            const success = await UpdateGuildMember(member);
            await interaction.reply({ephemeral: true, embeds:[EmbedCreator({title: success?`Successfully updated your roles and nickname.`:`Something went wrong while updating your profile`, color: success?'Green':'Red'})]});
        }catch(error){
            console.log('update_roles.ts - ',error)
        }
    }
}

export default command