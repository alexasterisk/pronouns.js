import { Subcommand } from '@made-simple/discord.js';
import { PronounEmojiIDs, ResponseEmbeds } from '../../util/pronouns.js';

export default new Subcommand('link')
    .setDescription(
        'Links your en.pronouns.page account to your Discord profile.'
    )
    .addStringOption((option) =>
        option
            .setName('username')
            .setDescription('The username of your en.pronouns.page account.')
            .setRequired(true)
    )
    .setExecutor(async (_, interaction) => {
        interaction.deferReply({
            ephemeral: true
        });

        const username = interaction.options.getString('username', true);

        if (!username) {
            interaction.editReply({
                embeds: [ResponseEmbeds.NO_USERNAME_PROVIDED]
            });
            return;
        }

        const userpage = await fetch(
            'https://en.pronouns.page/api/profile/get/' + username
        );
        const data = await userpage.json();
        const en = data?.profiles?.en;

        if (!en) {
            interaction.editReply({
                embeds: [ResponseEmbeds.ACCOUNT_DOESNT_EXIST]
            });
            return;
        }

        const pronouns = en.pronouns;
        if (!pronouns) {
            interaction.editReply({
                embeds: [ResponseEmbeds.NO_PRONOUNS_PROVIDED]
            });
            return;
        }

        let formattedPronouns = '';

        // eslint-disable-next-line prefer-const
        for (let [pronoun, value] of Object.entries(pronouns)) {
            if (pronoun.match(/(^https?:\/{2})|^.+\..+$/gi)) {
                pronoun = pronoun.split(/\/(?:\w+$)/gi)[1];
            }

            const pronounPage = await fetch(
                'https://en.pronouns.page/api/pronouns/' + pronoun
            );
            const pronounData = await pronounPage.json();
            const alias = pronounData?.aliases;

            // TODO: find or make roles for these pronouns (make sure to ignore custom pronouns)
            // TODO: add roles to user

            if (value === 1) {
                formattedPronouns +=
                    PronounEmojiIDs[value] +
                    ` **${alias || pronoun} ${
                        pronounPage &&
                        ` -- [link](https://en.pronouns.page/api/pronouns/${pronoun})`
                    }**\n`;
            } else if (typeof value === 'number') {
                formattedPronouns +=
                    PronounEmojiIDs[value] +
                    ` ${alias || pronoun} ${
                        pronounPage &&
                        ` -- [link](https://en.pronouns.page/api/pronouns/${pronoun})`
                    }\n`;
            }
        }

        const pronounEmbed = ResponseEmbeds.LINKED_ACCOUNT;
        pronounEmbed.addFields({
            name: '• pronouns',
            value: formattedPronouns
        });

        interaction.editReply({
            embeds: [pronounEmbed]
        });
    });
