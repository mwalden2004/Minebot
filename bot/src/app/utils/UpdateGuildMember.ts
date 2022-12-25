import { GuildMember, PartialGuildMember } from "discord.js";
import { Guilds, Users } from "../entities";
import { UUIDtoUsername } from "./Minecraft";

export async function addRole(member: GuildMember, role?: string){
    if (role) member.roles.add(role);
}
export async function removeRole(member: GuildMember, role?: string){
    if (role) member.roles.remove(role);
}

export default async function UpdateGuildMember(member: GuildMember): Promise<false|string>{

    const guildId = member.guild.id;
    const discordId = member.id;

    await member.guild.fetch();
    await member.guild.roles.fetch();

    const guild = await Guilds.findOne({where:{guildId}});
    const user = await Users.findOne({where:{discordId}});


    const isVerified = user && Object.keys(user.accounts).length !== 0;

    if (isVerified){
        // Check which UUID they're verified with
        const account = user.accounts.links[guildId]||user?.mainAccount;

        if (!account){
            addRole(member, guild?.unverifiedRole); removeRole(member, guild?.verifiedRole);
            return false;
        }

        const username = await UUIDtoUsername(account);
        if (!username || typeof(username) !== 'string'){
            return false;
        }

        // Manage roles
        addRole(member, guild?.verifiedRole); removeRole(member, guild?.unverifiedRole)

        // Manage nickname templates
        if (guild?.nicknameTemplate){
            const template = guild.nicknameTemplate.split('{minecraft-username}').join(username).split('{discord-username}').join(member.user.username).split('{minecraft-name}').join(username).split('{discord-name}').join(member.user.username);
            member.setNickname(template).catch(errr=>{})
        }

        return username;

    }else{
        // Manage roles
        addRole(member, guild?.unverifiedRole)
        removeRole(member, guild?.verifiedRole)
        return false;
    }
}