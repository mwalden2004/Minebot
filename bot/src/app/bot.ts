import {Client} from 'discord.js';

export default function StartDiscordBot(): void{

    const client = new Client({
        intents: ['GuildMembers']
    });

    client.on('login', () => {
        console.log(`${client.user?.username} Online`)
    })


    client.login(process.env.DISCORD_TOKEN);
}