import { GuildMember } from "discord.js";
import UpdateGuildMember from "../utils/UpdateGuildMember";

export default async function GuildMemberAdd(member: GuildMember): Promise<void> {
    await member.fetch();
    UpdateGuildMember(member);
}