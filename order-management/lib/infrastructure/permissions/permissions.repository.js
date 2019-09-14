const Permission = require('../../domain/permissionsAR/permissions.model');

module.exports = {
    getAllPermissions: () =>
        Permission.find({})
            .lean()
            .exec(),

    getPermissionById: id =>
        Permission.findOne({ _id: id })
            .lean()
            .exec(),

    getPermissionByRole: role =>
        Permission.findOne({ role })
            .lean()
            .exec(),

    createPermission: data => Permission.create({ ...data }),

    updatePermissionById: (id, data) =>
        Permission.findOneAndUpdate(
            {
                _id: id,
            },
            data,
            { new: true }
        )
            .lean()
            .exec(),

    updatePermissionByRole: (role, data) =>
        Permission.findOneAndUpdate(
            {
                role,
            },
            data,
            { new: true }
        )
            .lean()
            .exec(),

    deletePermissionById: id =>
        Permission.findOneAndRemove({
            _id: id,
        }),

    deletePermissionByRole: role =>
        Permission.findOneAndRemove({
            role,
        }),
};
