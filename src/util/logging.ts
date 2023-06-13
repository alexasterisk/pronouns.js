import chalk, { ChalkInstance } from 'chalk';

const breakLine = '--------------------------------------------------\n';

export const log = {
    info: (message: string) => {
        log.custom(message, null, chalk.blue);
    },

    error: (message: string, error: Error) => {
        log.custom(message, 'ERROR', chalk.red, true);
        console.error(chalk.redBright(error));
        console.log(chalk.red(breakLine));
    },

    success: (message: string) => {
        log.custom(message, 'SUCCESS', chalk.green);
    },

    custom: (
        message: string,
        prefix?: string | null,
        color?: ChalkInstance | keyof ChalkInstance | null,
        skipBreakLine?: boolean | null
    ) => {
        let chalkColor: ChalkInstance;
        if (typeof color === 'string') {
            chalkColor = chalk[color as string] || chalk.white;
        } else {
            chalkColor = (color as ChalkInstance) || chalk.white;
        }

        console.log(
            chalkColor(breakLine) +
                (prefix ? chalkColor.bold(prefix + ' ') : '') +
                message +
                '\n' +
                (skipBreakLine ? '' : chalkColor(breakLine))
        );
    }
};

export default log;
