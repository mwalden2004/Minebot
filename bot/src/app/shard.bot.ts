import { ShardingManager } from "discord.js";
import initalizeCommands from "./utils/InitalizeCommands";

const TOKEN = process.env.DISCORD_TOKEN as string;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID as string;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET as string;

export default async function StartDiscordBot(): Promise<void> {
    await initalizeCommands(TOKEN, CLIENT_ID, true);

    const manager = new ShardingManager("./dist/app/main.bot.js", {
        token: TOKEN,
    });

    manager.on("shardCreate", (shard) => {
        console.log(`Launched shard ${shard.id}`);
    });

    manager.spawn();

}