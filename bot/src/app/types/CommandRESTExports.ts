import { ApplicationCommandOptionData } from "discord.js";
import { DiscordPermissionsBitwiseFlags } from "./CommandExports";

type CommandRESTExports = {
    name: string;
    description: string;
    dm_permission?: boolean;
    default_member_permissions?: DiscordPermissionsBitwiseFlags;
    options?: ApplicationCommandOptionData };

export default CommandRESTExports;