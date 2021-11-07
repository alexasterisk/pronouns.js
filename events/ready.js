export const name = 'ready';
export const once = true;
export function execute(client) {
    client.user.setStatus('idle');
    client.user.setActivity('pronouns.page', { type: 'WATCHING' });
    require('../deploy').deployAll(client);
};