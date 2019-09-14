const jwt = require('jsonwebtoken');
const get = require('lodash/get');
const logger = require('../../utils/logger');

module.exports = async (req, res, next) => {
    const authorization = get(req, 'headers.authorization') || '';

    const token = authorization.toLowerCase().startsWith('bearer')
        ? get(authorization.split(' '), '1')
        : authorization;

    try {
        const user = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = user;

        return next();
    } catch (error) {
        logger.log(error);
        return res.status(401).send({ error });
    }
};
