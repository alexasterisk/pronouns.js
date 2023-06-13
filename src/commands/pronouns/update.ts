import { Subcommand } from '@made-simple/discord.js';

export default new Subcommand('update')
    .setDescription(
        "If you've updated your en.pronouns.page, this will respectively change your pronouns to match the change!"
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .setExecutor(async (_, interaction) => {
        // TODO: Implement this command
    });
