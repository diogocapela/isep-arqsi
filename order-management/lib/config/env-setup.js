/* eslint-disable global-require */
const path = require('path');
const logger = require('../utils/logger');

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({
        path: path.join(__dirname, '../../.env.development'),
    });
    logger.log('Reading environment variables from .env.development...');
}

if (process.env.NODE_ENV === 'production') {
    require('dotenv').config({
        path: path.join(__dirname, '../../.env.production'),
    });
    logger.log('Reading environment variables from .env.production...');
}

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: path.join(__dirname, '../../.env.test') });
    logger.log('Reading environment variables from .env.test...');
}
