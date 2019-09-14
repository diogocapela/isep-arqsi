const { Router } = require('express');

const authController = require('./application/auth/auth.controller');
const orderController = require('./application/orders/orders.controller');
const usersController = require('./application/users/users.controller');
const permissionsController = require('./application/permissions/permissions.controller');

const onlyGuests = require('./application/middlewares/onlyGuests');
const onlyAuthenticated = require('./application/middlewares/onlyAuthenticated');
const withAuth = require('./application/middlewares/withAuth');

const router = new Router();

router.use('/auth', [onlyGuests], authController);
router.use('/orders', [withAuth, onlyAuthenticated], orderController);
router.use('/users', [withAuth, onlyAuthenticated], usersController);
router.use('/permissions', permissionsController);

router.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;
