const OrdersRepository = require('./orders.repository');

module.exports = {
    getAllOrders: () => {
        return OrdersRepository.getAllOrders();
    },
    mostSoldProduct: async () => {
        let orders = await OrdersRepository.getAllOrders();
        let products = {};

        for (order in orders) {
            for (product in orders[order].products) {
                let _product = orders[order].products[product];
                if (products[_product.id]) {
                    products[_product.id].quantity += _product.quantity;
                    products[_product.id].id = _product.id;
                } else {
                    products[_product.id] = {};
                    products[_product.id].quantity = _product.quantity;
                    products[_product.id].id = _product.id;
                }
            }
        };
        products = Object.values(products).sort((a,b) =>  b.quantity-a.quantity);
        return products;

    },
    mostTimesSoldProduct: async () => {
        let orders = await OrdersRepository.getAllOrders();
        let products = {};

        for (order in orders) {
            for (product in orders[order].products) {
                let _product = orders[order].products[product];
                if (products[_product.id]) {
                    products[_product.id].timesSold += 1;
                    products[_product.id].id = _product.id;
                } else {
                    products[_product.id] = {};
                    products[_product.id].timesSold = 1;
                    products[_product.id].id = _product.id;
                }
            }
        };
        products = Object.values(products).sort((a,b) =>  b.timesSold-a.timesSold);
        return products;
    },
    getOrderById: id => {
        return OrdersRepository.getOrderById(id);
    },
    createOrder: data => {
        return OrdersRepository.createOrder(data);
    },
    updateOrderById: (id, data) => {
        return OrdersRepository.updateOrderById(id, data);
    },
    deleteOrderById: id => {
        return OrdersRepository.deleteOrderById(id);
    },
};
