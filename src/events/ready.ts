import { Client, Event } from '@made-simple/discord.js';
import { ActivityType } from 'discord.js';

export default new Event('ready', true).setExecutor(
    (client: Client<object>) => {
        client.user?.setStatus('idle');
        client.user?.setActivity('pronouns.page', {
            type: ActivityType.Watching
        });
    }
);
