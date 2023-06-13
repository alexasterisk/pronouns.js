import 'dotenv/config.js';

import './database.js';
import { Client } from '@made-simple/discord.js';

const client = new Client({
    intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'GuildModeration'],
    partials: ['GuildMember', 'User']
});

const eventsFolder = new URL('events/', import.meta.url);
await client.addEventsFolder(eventsFolder);

const commandsFolder = new URL('commands/', import.meta.url);
await client.addCommandsFolder(commandsFolder);
await client.registerCommands(undefined, '');

await client.login();
