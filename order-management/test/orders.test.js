/* eslint-disable no-undef */
const ordersService = require('../lib/infrastructure/orders/orders.service');
const ordersRepository = require('../lib/infrastructure/orders/orders.repository');

jest.mock('../lib/infrastructure/orders/orders.repository');

describe('ordersService', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
    });

    it('getAllOrders', () => {
        const orders = [{ order: 'Order 1' }, { order: 'Order 2' }];
        const resp = { data: orders };
        ordersRepository.getAllOrders.mockResolvedValue(resp);

        return ordersService
            .getAllOrders()
            .then(data => expect(data).toEqual(resp));
    });

    it('getOrder', () => {
        const id = 1;
        const order = { name: 'Order 1' };
        const resp = { data: order };
        ordersRepository.getOrderById.mockResolvedValue(resp);

        return ordersService
            .getOrderById(id)
            .then(data => expect(data).toEqual(resp));
    });
});
