const Order = require('../../domain/ordersAR/orders.model');

module.exports = {
    getAllOrders: () =>
        Order.find({})
            .populate('createdBy')
            .lean()
            .exec(),

    getOrderById: id =>
        Order.findOne({ _id: id })
            .populate('createdBy')
            .lean()
            .exec(),

    createOrder: data => Order.create({ ...data }),

    updateOrderById: (id, data) =>
        Order.findOneAndUpdate(
            {
                _id: id,
            },
            data,
            { new: true }
        )
            .populate('createdBy')
            .lean()
            .exec(),

    deleteOrderById: id =>
        Order.findOneAndRemove({
            _id: id,
        }),
};
