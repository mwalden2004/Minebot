import { ApplicationCommandOptionType } from "discord.js";

type OptionsType = {
    type?: ApplicationCommandOptionType;
    name: string;
    description?: string;
    required?: boolean;
    choices?: {
        name: string;
        value: string;
    }[]
}[];

export default OptionsType;