import { SubcommandGroup } from '@made-simple/discord.js';

export default new SubcommandGroup('pronouns', {
    allowedInDMs: false
}).setDescription('Modifies your pronouns on the server.');
