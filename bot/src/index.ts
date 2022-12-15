import 'source-map-support/register';

import * as dotenv from 'dotenv'
dotenv.config()

import { dataSource } from './db';
import StartDiscordBot from './app/shard.bot';


async function main() {
  await dataSource.initialize();
  StartDiscordBot();
}

main().catch(err => { console.error(err.stack); });
