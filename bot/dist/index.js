"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const dotenv = require("dotenv");
dotenv.config();
const db_1 = require("./db");
const bot_1 = require("./app/bot");
async function main() {
    await db_1.dataSource.initialize();
    (0, bot_1.default)();
}
main().catch(err => { console.error(err.stack); process.exit(1); });
//# sourceMappingURL=index.js.map