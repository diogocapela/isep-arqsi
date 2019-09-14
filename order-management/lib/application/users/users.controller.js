const bcrypt = require('bcrypt');
const { Router } = require('express');

const logger = require('../../utils/logger');
const UsersService = require('../../infrastructure/users/users.service');
const UsersInDto = require('../../domain/usersAR/users.inDTO');

const controller = new Router();

/* POST: Register
===================================================================== */
controller.post('/register', async (req, res) => {
    const { password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(
            password,
            +process.env.BCRYPT_SALT_ROUNDS
        );

        const user = await UsersService.createUser({
            ...req.body,
            password: hashedPassword,
        });

        return res.status(201).json({ data: user });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ error });
    }
});

/* GET: USER gdpr
=========================================================== */
controller.get('/:id/gdpr', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UsersService.getUserById(id);
        return res.status(200).json(user.settings);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error });
    }
});

/* PUT USER GDPR
============================================================ */
controller.put('/:id/gdpr', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await UsersService.updateUserBySlug(id, req.body);
        return res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error });
    }
});

/* UPDATE USER
============================================================ */
controller.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UsersService.updateUserById(id, req.body);
        return res.status(200).json(user);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error });
    }
});

/* GET USER
================================================================= */
controller.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        if (req.user._id !== id && req.user.role !== 'admin') {
            return res.status(401).json();
        }

        const user = await UsersService.getUserById(id);
        return res.status(200).json(user);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error });
    }
});

/* UPDATE USER
================================================================= */
controller.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (req.user._id !== id && req.user.role !== 'admin') {
            return res.status(401).json();
        }
        const userIn = UsersInDto.inDtoToUser(id, req.body);
        const user = await UsersService.updateUserById(id, userIn);
        return res.status(200).json(user);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error });
    }
});

controller.get('', async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(401).json();
        }

        const users = await UsersService.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error });
    }
});

module.exports = controller;
