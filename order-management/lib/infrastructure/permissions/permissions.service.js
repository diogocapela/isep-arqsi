const PermissionsRepository = require('./permissions.repository');

module.exports = {
    getAllPermissions: () => {
        return PermissionsRepository.getAllPermissions();
    },
    getPermissionById: id => {
        return PermissionsRepository.getPermissionById(id);
    },
    getPermissionByRole: role => {
        return PermissionsRepository.getPermissionByRole(role);
    },
    createPermission: data => {
        return PermissionsRepository.createPermission(data);
    },
    updatePermissionById: (id, data) => {
        return PermissionsRepository.updatePermissionById(id, data);
    },
    updatePermissionByRole: (role, data) => {
        return PermissionsRepository.updatePermissionByRole(role, data);
    },
    deletePermissionById: id => {
        return PermissionsRepository.deletePermissionById(id);
    },
    deletePermissionByRole: role => {
        return PermissionsRepository.deletePermissionByRole(role);
    },
};
