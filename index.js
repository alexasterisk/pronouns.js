require('dotenv').config();
import { readdirSync } from 'fs';

import chalk, { green, bgBlue, yellow, bgRed } from 'chalk';

import Keyv from 'keyv';
const keyv = new Keyv('sqlite://data.sqlite');

import { Client, Intents, Collection, MessageEmbed } from 'discord.js';
const client = new Client({ intents: [ Intents.FLAGS.GUILDS ]});

console.log(`${green('--------------------------------------------------')}\n${bgBlue.black('INIT')} Initializing your project...`);

keyv.on('error', err => {
    console.log(`${yellow('--------------------------------------------------')}\n${bgRed.bold('ERROR')} Keyv has experienced an error!\nThe error is documented below:`);
    console.error(err);
    console.log(yellow('--------------------------------------------------'));
});

let currAmount = 0;
let currStr = '';

const eventFiles = readdirSync('./events').filter(f => f.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    currStr += `\n${chalk[event.once && 'red' || 'green'](event.once && 'once' || 'on')} ${event.name}`;
    client[event.once && 'once' || 'on'](event.name, (...args) => event.execute(...args));
};

currAmount = 0;
currStr = '';

client.db = keyv;
client.commands = new Collection();
const commandFiles = readdirSync('./commands').filter(f => f.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    currStr += `\n${command.name}`;
    client.commands.set(command.name, command);
};

client.on('interactionCreate', interaction => {
    if (interaction.inGuild() && interaction.isCommand()) {
        const subcommand = interaction.options.getSubcommand();
        const command = client.commands.get(interaction.commandName);
        if (command && subcommand && command.subs?.[subcommand]) {
            command.subs[subcommand].execute(interaction);
        } else {
            interaction.reply({
                ephemeral: true,
                embeds: [new MessageEmbed()
                    .setTitle('The command you ran does not exist!')
                    .setDescription('Please try running the command again, if this issue persists please feel free to report it!')
                    .setColor(13047173)
                    .setFooter('pronouns.js', 'http://pronouns.page/favicon.svg')
                ],
            });
        };
    };
});

client.login(process.env.TOKEN);
console.log(green('--------------------------------------------------'));