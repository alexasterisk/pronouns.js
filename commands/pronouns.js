import fetch from 'node-fetch';
import { Constants, MessageEmbed } from 'discord.js';
const TYPES = Constants.ApplicationCommandOptionTypes;

let emojiIds = {
    [-1]: '👎', // no
    [ 0]: '👍', // okay
    [ 1]: '❤️', // yes
    [ 2]: '😛', // jokingly
    [ 3]: '👥', // only if were close
};

export const name = 'pronoun';
export const description = 'Modifies your pronouns on the server.';
export const options = [{
    name: 'link',
    description: 'Links your en.pronouns.page account to your Discord profile.',
    type: TYPES.SUB_COMMAND,
    options: [{
        name: 'username',
        description: 'The username of your en.pronouns.page account.',
        required: true,
        type: TYPES.STRING
    }]
}, {
    name: 'update',
    description: 'If you\'ve updated your en.pronouns.page account, this will respectively change your pronouns to match the change!',
    type: TYPES.SUB_COMMAND,
}];
export const subs = {
    link: {
        async execute(interaction) {
            const username = interaction.options.getString('username');

            if (!username || typeof username === 'string') {
                return interaction.reply({
                    ephemeral: true,
                    embeds: [new MessageEmbed()
                        .setTitle('Invalid username passed!')
                        .setDescription('The username you passed was invalid, please try again!')
                        .setColor(13047173)
                        .setFooter('pronouns.js', 'https://pronouns.page/favicon.svg')
                    ],
                });
            };

            const userpage = await fetch('https://en.pronouns.page/api/profile/get/' + username);
            const data = await userpage.json();
            const en = data?.profiles?.en;

            if (!en) {
                return interaction.reply({
                    ephemeral: true,
                    embeds: [new MessageEmbed()
                        .setTitle('There is no data for this account!')
                        .setDescription('The username you gave does not have any data on [en.pronouns.page](https://en.pronouns.page/), please either [make an account](https://en.pronouns.page/account), provide an existing Pronouns.page account, or make an English page for your pronouns.page!')
                        .setColor(13047173)
                        .setFooter('pronouns.js', 'https://pronouns.page/favicon.svg')
                    ],
                });
            };

            const pronouns = en.pronouns;
            if (!pronouns) {
                return interaction.reply({
                    ephemeral: true,
                    embeds: [new MessageEmbed()
                        .setTitle('Could not find any pronouns for you!')
                        .setDescription('It seems you have not uploaded any pronouns to your account! Please [upload some pronouns](https://en.pronouns.page/account) to your account so I can give you some roles!')
                        .setColor(13047173)
                        .setFooter('pronouns.js', 'https://pronouns.page/favicon.svg')
                    ],
                });
            };

            let format = '';

            for (let [pronoun, value] of Object.entries(pronouns)) {
                if (pronoun.match(/(^https?:\/{2})|^.+\..+$/gi)) {
                    pronoun = pronoun.split(/\/(?:\w+$)/gi)[1];
                };

                const propage = await fetch('https://en.pronouns.page/api/pronouns/' + pronoun);
                const pronounData = await propage.json();
                const alias = pronounData?.aliases;

                if (value === 1) {
                    format += `${emojiIds[value]} **${alias || pronoun} ${propage && ` -- [link](https://en.pronouns.page/api/pronouns/${pronoun})`}**\n`;
                } else {
                    format += `${emojiIds[value]} ${alias || pronoun} ${propage && ` -- [link](https://en.pronouns.page/api/pronouns/${pronoun})`}\n`;
                };
            }

            return interaction.reply({
                embeds: [new MessageEmbed()
                    .setTitle('Your pronouns have been set!')
                    .setDescription('I have automatically set your pronouns on this server! Thank you for using this bot!')
                    .setColor(13047173)
                    .setFooter('pronouns.js', 'https://pronouns.page/favicon.svg')
                    .addField('• pronouns', format)
                ],
            });
        },
    },
};