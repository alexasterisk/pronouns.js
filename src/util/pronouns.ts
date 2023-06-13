import { EmbedBuilder } from 'discord.js';

const footer = {
    text: 'pronouns.js',
    iconURL: 'https://pronouns.page/favicon.svg'
};

const NO_USERNAME_PROVIDED = new EmbedBuilder()
    .setTitle('Invalid username passed!')
    .setDescription(
        'The username you passed was either empty or invalid, please try again!'
    )
    .setColor('Red')
    .setFooter(footer);

const ACCOUNT_DOESNT_EXIST = new EmbedBuilder()
    .setTitle('There is no data for this account!')
    .setDescription(
        'The username you gave does not have any data on [en.pronouns.page](https://en.pronouns.page/), please either [make an account](https://en.pronouns.page/account), provide an existing Pronouns.page account, or make an English page for your Pronouns.page!'
    )
    .setColor('Red')
    .setFooter(footer);

const NO_PRONOUNS_PROVIDED = new EmbedBuilder()
    .setTitle('Could not find any pronouns for you!')
    .setDescription(
        'It seems you have not uploaded any pronouns to your account! Please [upload some pronouns](https://en.pronouns.page/account) to your account so I can give you some roles!'
    )
    .setColor('Red')
    .setFooter(footer);

const LINKED_ACCOUNT = new EmbedBuilder()
    .setTitle('Your pronouns have been set!')
    .setDescription(
        'I have set your pronouns on this server! Thank you for using this bot!'
    )
    .setColor('Green')
    .setFooter(footer);

export const ResponseEmbeds = {
    NO_USERNAME_PROVIDED,
    ACCOUNT_DOESNT_EXIST,
    NO_PRONOUNS_PROVIDED,
    LINKED_ACCOUNT
};

export const PronounEmojiIDs = {
    [-1]: '👎', // no
    [0]: '👍', // okay
    [1]: '❤️', // yes
    [2]: '😛', // jokingly
    [3]: '👥' // only if were close
};
