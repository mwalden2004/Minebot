import { REST, Routes } from "discord.js";
import { ExportType } from "../types/CommandExports";
import CommandRESTExports from "../types/CommandRESTExports";
import { readdirSync } from 'fs';
import { join } from 'path';

export default async function initalizeCommands(TOKEN: string, CLIENT_ID: string, sendApiRequest: boolean): Promise<{ [name: string]: ExportType }> {
    let toSend: CommandRESTExports[] = [];
    let commands = {};

    for (const file of readdirSync(join(__dirname, '../commands'))) {
        if (!file.includes('.map')) {
            const command: ExportType = require(`../commands/${file}`).default;
            commands[command.name] = command;
            toSend.push({ name: command.name, description: command.description, dm_permission: command.dm_permission, default_member_permissions: command.default_member_permissions, options: command.options })
        };
    }

    if (sendApiRequest) {
        const rest = new REST({ version: '10' }).setToken(TOKEN);
        rest.put(Routes.applicationCommands(CLIENT_ID), { body: toSend }).then(() => {
            console.log(`Successfully registered commands: ${toSend.map(a => a.name).join(", ")}`)
        }).catch((e) => {
            console.log(`Somethinhg went wrong registering commands: ${toSend.map(a => a.name).join(", ")}`)
            console.log(JSON.stringify(e.rawError))
        })
    }

    return commands;
}