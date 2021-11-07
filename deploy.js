import { readdirSync } from 'fs';

export async function deployAll(client) {
    const guild = client.guilds.cache.get(870918853402701855);
    let commands = guild?.commands;

    let permissions = [];

    const commandFiles = readdirSync('./commands').filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        if (command.isCommand ?? true) {
            const cmd = await commands?.create({
                name: command.name,
                description: command.description,
                options: command.options ?? [],
                defaultPermission: command.permissionForAll ?? true,
            });

            permissions.push({
                id: cmd.id,
                permissions: command.permissions ?? [],
            });
        };
    };

    await commands?.permissions.set({ permissions });

};