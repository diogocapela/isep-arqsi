const get = require('lodash/get');

module.exports = async (req, res, next) => {
    if (!get(req, 'user.role')) {
        return next();
    }

    return res
        .status(401)
        .send({ error: 'Only guests can access this endpoint!' });
};
