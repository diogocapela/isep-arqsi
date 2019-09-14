const UsersRepository = require('./users.repository');

module.exports = {
    getAllUsers: () => {
        return UsersRepository.getAllUsers();
    },
    getUserById: id => {
        return UsersRepository.getUserById(id);
    },

    getUserByEmail: email => {
        return UsersRepository.getUserByEmail(email);
    },
    createUser: data => {
        return UsersRepository.createUser(data);
    },
    updateUserById: (id, data) => {
        return UsersRepository.updateUserById(id, data);
    },
    updateUserBySlug: (slug, data) => {
        return UsersRepository.updateUserBySlug(slug, data);
    },
    deleteUserById: id => {
        return UsersRepository.deleteUserById(id);
    },
    deleteUserBySlug: slug => {
        return UsersRepository.deleteUserBySlug(slug);
    },
    updateGDPR: async (id, settings) => {
        const user = await UsersRepository.getUserById(id);
        user.settings = settings;
        const updatedUser = await UsersRepository.updateUserById(id, user);

        return updatedUser.settings;
    },
};
