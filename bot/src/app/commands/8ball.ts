import { ApplicationCommandOptionType } from "discord.js";
import { ExportType } from "../types/CommandExports";
import EmbedCreator from "../utils/EmbedCreator";

const POSSIBLE_ANSWERS = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes definitely.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."]

const command: ExportType = {
    name: '8ball',
    description: 'Allows you to play with 8-ball',
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'question',
            description: 'What is the question you\'d like to ask the 8-ball?',
            required: true
        }
    ],
    executor: async (interaction) => {
        const questionAsked = interaction.options.getString('question');
        const embed = EmbedCreator({ title: '🎱 8-ball' });

        if (!questionAsked){
            return interaction.reply({
                embeds: [EmbedCreator({ title: '🎱 8-ball', description: 'You must provide a question!', color: 'Red' })]
            })
        }

        embed.addFields({
            name: 'Question',
            value: questionAsked
        }, {
            name: 'Answer',
            value: POSSIBLE_ANSWERS[Math.floor(Math.random() * POSSIBLE_ANSWERS.length)]
        });

        return interaction.reply({
            embeds: [embed]
        })
    }
}

export default command