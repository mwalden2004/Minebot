"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUIDtoUsername = exports.UsernameToUUID = void 0;
const node_fetch_1 = require("node-fetch");
async function UsernameToUUID(username) {
    const req = await (0, node_fetch_1.default)(`https://api.mojang.com/users/profiles/minecraft/${username}`);
    const resp = await req.json();
    if (!resp.id) {
        return new Error(`Unable to find information about ${username}`);
    }
    return resp.id;
}
exports.UsernameToUUID = UsernameToUUID;
async function UUIDtoUsername(uuid) {
    const req = await (0, node_fetch_1.default)(`https://api.mojang.com/user/profile/${uuid}`);
    const resp = await req.json();
    if (!resp.id) {
        return new Error(`Unable to find information about ${uuid}`);
    }
    return resp.name;
}
exports.UUIDtoUsername = UUIDtoUsername;
//# sourceMappingURL=Minecraft.js.map