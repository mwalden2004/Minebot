import { ActivityType } from "discord.js";

export default async function Ready(client): Promise<void> {
    if (!client.user) {
        return;
    }
    client.user.setActivity('minebot.app', { type: ActivityType.Watching });
    console.log(`${client.user?.username} Online`);
}