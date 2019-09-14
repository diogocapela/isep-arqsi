const User = require('../../domain/usersAR/users.model');

module.exports = {
    getAllUsers: () =>
        User.find({})
            .lean()
            .exec(),

    getUserById: id =>
        User.findOne({ _id: id })
            .lean()
            .exec(),

    getUserByEmail: email =>
        User.findOne({ email })
            .lean()
            .exec(),

    createUser: data => User.create({ ...data }),

    updateUserById: (id, data) =>
        User.findOneAndUpdate(
            {
                _id: id,
            },
            data,
            { new: true }
        )
            .lean()
            .exec(),

    updateUserBySlug: (slug, data) =>
        User.findOneAndUpdate(
            {
                slug,
            },
            data,
            { new: true }
        )
            .lean()
            .exec(),

    deleteUserById: id =>
        User.findOneAndRemove({
            _id: id,
        }),

    deleteUserBySlug: slug =>
        User.findOneAndRemove({
            slug,
        }),
};
