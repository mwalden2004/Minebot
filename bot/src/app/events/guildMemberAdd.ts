import { GuildMember } from "discord.js";
import UpdateGuildMember from "../utils/UpdateGuildMember";

export default async function GuildMemberAdd(member: GuildMember): Promise<void> {
    await member.fetch();

    try{
        await UpdateGuildMember(member);
    }catch(error){
        console.log('guildMemberAdd.ts - ',error)
    }
}