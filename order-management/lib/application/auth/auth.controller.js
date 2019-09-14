const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const logger = require('../../utils/logger');
const dao = require('../../infrastructure/users/users.repository');

const controller = new Router();

/* POST: Register ✅
===================================================================== */
controller.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(
            password,
            +process.env.BCRYPT_SALT_ROUNDS
        );

        await dao.createUser({
            ...req.body,
            password: hashedPassword,
        });

        const user = await dao.getUserByEmail(email);

        const token = jwt.sign(user, process.env.JWT_SECRET);

        return res.status(201).json({
            data: {
                ...user,
                token,
            },
        });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ error });
    }
});

/* POST: Login ✅
===================================================================== */
controller.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await dao.getUserByEmail(email);

        if (!user) {
            return res.status(400).json({ error: "User doesn't exist." });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ error: 'Wrong password.' });
        }

        const token = jwt.sign(user, process.env.JWT_SECRET);

        return res.status(200).json({
            data: {
                ...user,
                token,
            },
        });
    } catch (error) {
        logger.log(error);
        return res.status(400).json({ error });
    }
});

/* POST: Me ✅
===================================================================== */
controller.post('/me', async (req, res) => {
    logger.log('POST /auth/me', req.body);
    const {token} = req.body;

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await dao.getUserByEmail(decodedToken.email);

        if (!user) {
            return res.status(400).json({ error: "User doesn't exist." });
        }

        const newToken = jwt.sign(user, process.env.JWT_SECRET);

        return res.status(200).json({
            data: {
                ...user,
                token: newToken,
            },
        });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ error });
    }
});

module.exports = controller;
