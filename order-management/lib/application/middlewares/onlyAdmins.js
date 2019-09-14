const get = require('lodash/get');

module.exports = async (req, res, next) => {
    if (get(req, 'user.role') === 'admin') {
        return next();
    }

    return res
        .status(401)
        .send({ error: 'Only admins can access this endpoint!' });
};
