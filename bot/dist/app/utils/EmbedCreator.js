"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
function EmbedCreator({ title, description, color }) {
    const newEmbed = new discord_js_1.EmbedBuilder();
    newEmbed.setColor(color || 0x0099FF);
    newEmbed.setTitle(title);
    newEmbed.setTimestamp();
    if (description) {
        newEmbed.setDescription(description);
    }
    return newEmbed;
}
exports.default = EmbedCreator;
//# sourceMappingURL=EmbedCreator.js.map