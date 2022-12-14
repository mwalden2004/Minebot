import { Interaction } from "discord.js";
import FinishedVerifyingButton from "../buttons/finishedVeifying";

export default async function InteractionCreate(interaction: Interaction, commands): Promise<void> {


    if (interaction.isChatInputCommand()){
        const foundCommand = commands[interaction.commandName];

        if (foundCommand) {
            foundCommand.executor(interaction);
        }
    }

    if (interaction.isButton()){
        if (interaction.customId == 'finishedVeifying'){
            FinishedVerifyingButton(interaction);
        }
    }

}