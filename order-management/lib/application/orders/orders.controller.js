/* eslint-disable no-underscore-dangle */
const { Router } = require('express');
const OrdersService = require('../../infrastructure/orders/orders.service');
const logger = require('../../utils/logger');

const controller = new Router();


/* POST: Cancel Order by ID ✅
===================================================================== */
controller.post('/cancel/:id', async (req, res) => {
    const { id } = req.params;
    const isAdmin = req.user.role === 'admin';

    try {
        const order = await OrdersService.getOrderById(id);

        if (!isAdmin && order.createdBy.email !== req.user.email) {
            return res
                .status(401)
                .send({ error: 'You are not allowed to cancel this order.' });
        }

        const canceledOrded = await OrdersService.updateOrderById(id, {
            ...order,
            status: 'canceled',
        });

        if (!canceledOrded) {
            return res.status(400).end();
        }

        return res.status(200).json({ data: canceledOrded });
    } catch (error) {
        logger.error(error);
        return res.status(400).send({ error });
    }
});

/* GET: MostSoldProduct
======================================================= */
controller.get('/most-sold-product', async (req, res) =>{

    try{
        const products = await OrdersService.mostSoldProduct();
        
        return res.status(200).json(products);

    }catch(error) {
        logger.error(error);
        return res.status(400).send({ error });
    }
});

/* GET: MostTimesSold
======================================================= */
controller.get('/most-times-sold-product', async (req, res) =>{

    try{
        const products = await OrdersService.mostTimesSoldProduct();
        
        return res.status(200).json(products);

    }catch(error) {
        logger.error(error);
        return res.status(400).send({ error });
    }
});

/* GET: Get All Orders ✅ (Admin = ALL) (Client = His Own)
===================================================================== */
controller.get('/', async (req, res) => {
    const isAdmin = req.user.role === 'admin';

    try {
        let orders = await OrdersService.getAllOrders();

        if (!isAdmin) {
            orders = orders.filter(o => o.createdBy.email === req.user.email);
        }

        return res.status(200).json({ data: orders });
    } catch (error) {
        logger.error(error);
        return res.status(400).send({ error });
    }
});

/* GET: Get Order by ID ✅
===================================================================== */
controller.get('/:id', async (req, res) => {
    const { id } = req.params;
    const isAdmin = req.user.role === 'admin';

    try {
        const order = await OrdersService.getOrderById(id);

        if (!order) {
            return res.status(400).send({ error: 'No order with this ID.' });
        }

        if (!isAdmin && order.createdBy.email !== req.user.email) {
            return res
                .status(401)
                .send({ error: 'You are not allowed to view this order.' });
        }

        return res.status(200).json({ data: order });
    } catch (error) {
        logger.error(error);
        return res.status(400).send({ error });
    }
});

/* POST: Create Order ✅
===================================================================== */
controller.post('/', async (req, res) => {
    try {
        const order = await OrdersService.createOrder({
            ...req.body,
            createdBy: req.user._id,
        });

        // eslint-disable-next-line global-require
        global._io.emit('newOrder', order);

        return res.status(201).json({ data: order });
    } catch (error) {
        logger.error(error);
        return res.status(400).send({ error });
    }
});

/* PUT: Update Order by ID ✅
===================================================================== */
controller.put('/:id', async (req, res) => {
    const { id } = req.params;
    const isAdmin = req.user.role === 'admin';

    try {
        const order = await OrdersService.updateOrderById(id, {
            ...req.body,
        });

        if (!order) {
            return res.status(400).send({ error: 'No order with this ID.' });
        }

        if (!isAdmin && order.createdBy.email !== req.user.email) {
            return res
                .status(401)
                .send({ error: 'You are not allowed to update this order.' });
        }

        return res.status(200).json({ data: order });
    } catch (error) {
        logger.error(error);
        return res.status(400).send({ error });
    }
});

module.exports = controller;
