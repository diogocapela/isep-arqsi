const get = require('lodash/get');

module.exports = async (req, res, next) => {
    if (get(req, 'user.role') === 'client') {
        return next();
    }

    return res
        .status(401)
        .send({ error: 'Only clients can access this endpoint!' });
};
