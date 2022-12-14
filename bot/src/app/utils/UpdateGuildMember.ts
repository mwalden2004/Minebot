import { GuildMember, PartialGuildMember } from "discord.js";
import { Guilds, Users } from "../entities";
import { UUIDtoUsername } from "./Minecraft";

export default async function UpdateGuildMember(member: GuildMember|PartialGuildMember): Promise<boolean>{

    const guildId = member.guild.id;
    const discordId = member.id;

    const guild = await Guilds.findOne({where:{guildId}});
    const user = await Users.findOne({where:{discordId}});

    if (!guild || !user){
        return false;
    }

    const isVerified = Object.keys(user.accounts).length !== 0;

    if (isVerified){

        // Check which UUID they're verified with

        const account = user.accounts.links[guildId]||user?.mainAccount;

        if (!account){
            return false;
        }else if (guild.unverifiedRole){
            member.roles.add(guild.unverifiedRole);
        }

        const username = await UUIDtoUsername(account);
        if (!username || typeof(username) !== 'string'){
            return false;
        }else if (guild.unverifiedRole){
            member.roles.add(guild.unverifiedRole);
        }

        if (guild.nicknameTemplate){
            member.setNickname(guild.nicknameTemplate.replaceAll('%username%', username));
        }

        if (guild.verifiedRole){
            member.roles.add(guild.verifiedRole);
        }


    }else{
        if (guild.unverifiedRole){
            member.roles.add(guild.unverifiedRole);
        }
        return true;
    }

    return true;
}