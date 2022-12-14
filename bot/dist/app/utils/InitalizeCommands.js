"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const path_1 = require("path");
async function initalizeCommands(TOKEN, CLIENT_ID) {
    let toSend = [];
    let commands = {};
    for (const file of (0, fs_1.readdirSync)((0, path_1.join)(__dirname, '../commands'))) {
        if (!file.includes('.map')) {
            const command = require(`../commands/${file}`).default;
            commands[command.name] = command;
            toSend.push({ name: command.name, description: command.description, dm_permission: command.dm_permission, default_member_permissions: command.default_member_permissions, options: command.options });
        }
        ;
    }
    const rest = new discord_js_1.REST({ version: '10' }).setToken(TOKEN);
    rest.put(discord_js_1.Routes.applicationCommands(CLIENT_ID), { body: toSend }).then(() => {
        console.log(`Successfully registered commands: ${toSend.map(a => a.name).join(", ")}`);
    }).catch((e) => {
        console.log(`Somethinhg went wrong registering commands: ${toSend.map(a => a.name).join(", ")}`, e);
    });
    return commands;
}
exports.default = initalizeCommands;
//# sourceMappingURL=InitalizeCommands.js.map