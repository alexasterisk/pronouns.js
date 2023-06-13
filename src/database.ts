import Keyv from 'keyv';
import logger from './util/logging.js';

const keyv = new Keyv('sqlite://data/keyv.sqlite');
keyv.on('error', (err) => logger.error('Keyv connection error', err));

export default keyv;
