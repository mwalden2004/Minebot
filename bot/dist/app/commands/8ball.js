"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const EmbedCreator_1 = require("../utils/EmbedCreator");
const command = {
    name: '8ball',
    description: 'Allows you to play with 8-ball',
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: 'question',
            description: 'What is the question you\'d like to ask the 8-ball?',
            required: true
        }
    ],
    executor: async (interaction) => {
        const questionAsked = interaction.options.getString('question');
        const affirmativeAnswers = ['', "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes definitely.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes."];
        const noncommittalAnswers = ['', "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again."];
        const negativeAnswers = ['', "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."];
        const answersType = ['', 'affirmativeAnswers', 'noncommittalAnswers', 'negativeAnswers'];
        const answers_randomNumber = Math.floor(Math.random() * 3) + 1;
        const embed = (0, EmbedCreator_1.default)({ title: '🎱 8-ball' });
        const response = {
            '': '',
            'affirmativeAnswers': affirmativeAnswers[Math.floor(Math.random() * 10) + 1],
            'noncommittalAnswers': noncommittalAnswers[Math.floor(Math.random() * 5) + 1],
            'negativeAnswers': negativeAnswers[Math.floor(Math.random() * 5) + 1]
        }[answersType[answers_randomNumber]];
        embed.addFields({
            name: 'Question',
            value: questionAsked
        }, {
            name: 'Answer',
            value: response
        });
        await interaction.reply({
            embeds: [embed]
        });
    }
};
exports.default = command;
//# sourceMappingURL=8ball.js.map