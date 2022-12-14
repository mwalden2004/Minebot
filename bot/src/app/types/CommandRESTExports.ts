import { ApplicationCommandOptionType } from "discord.js";
import { DiscordPermissionsBitwiseFlags } from "./CommandExports";
import OptionsType from "./OptionsType";

type CommandRESTExports = {
    name: string;
    description: string;
    dm_permission?: boolean;
    default_member_permissions?: DiscordPermissionsBitwiseFlags;
    options?: OptionsType
};

export default CommandRESTExports;