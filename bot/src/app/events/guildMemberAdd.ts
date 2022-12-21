import { GuildMember } from "discord.js";
import UpdateGuildMember from "../utils/UpdateGuildMember";
import { Guilds } from "../entities";
import EmbedCreator from "../utils/EmbedCreator";

export default async function GuildMemberAdd(member: GuildMember): Promise<void> {
    await member.fetch();

    try{
        const response = await UpdateGuildMember(member);

        const guildSettings = await Guilds.findOne({where:{guildId: member.guild.id}});

        if (!guildSettings || !guildSettings.joinMessages){
            return;
        }

        let message = guildSettings.joinMessages[response ? 'verified' : 'unverified'];
        if (message == '' || !message){
            return;
        }

        if (response){
            message=message.replaceAll(`{discord-name}`, member.user.username).replaceAll('{minecraft-name}', !response ? '' : response);
        }

        member.user.send({
            embeds: [
                EmbedCreator({
                    title: message,
                    description: `This message was set by ${member.guild.name} server.`,
                    color: 'Green'
                })
            ]
        })
    }catch(error){
        console.log('guildMemberAdd.ts - ',error)
    }
}