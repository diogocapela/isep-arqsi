const { Router } = require('express');

const logger = require('../../utils/logger');
const PermissionsService = require('../../infrastructure/permissions/permissions.service');

const controller = new Router();

/* GET: Get All Permissions
===================================================================== */
controller.get('/', async (req, res) => {
    try {
        const permissions = await PermissionsService.getAllPermissions();

        return res.status(200).json({ data: permissions });
    } catch (error) {
        logger.error(error);
        return res.status(400).send({ error });
    }
});

/* POST: Create Permission
===================================================================== */
controller.post('/', async (req, res) => {
    try {
        const permission = await PermissionsService.createPermission(req.body);

        return res.status(201).json({ data: permission });
    } catch (error) {
        logger.error(error);
        return res.status(400).send({ error });
    }
});

/* PUT: Update Permission by Role
===================================================================== */
controller.put('/:role', async (req, res) => {
    const { role } = req.params;

    try {
        const permission = await PermissionsService.updatePermissionByRole(
            role,
            req.body
        );

        if (!permission) {
            return res
                .status(400)
                .send({ error: 'No permission with for this role.' });
        }

        return res.status(200).json({ data: permission });
    } catch (error) {
        logger.error(error);
        return res.status(400).send({ error });
    }
});

module.exports = controller;
