const UsersModel = require('./users.model');

module.exports = {
    inDtoToUser: (id, userInDto) => {
        return { _id: id, ...userInDto };
    },
};
