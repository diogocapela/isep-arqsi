/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const request = require('supertest');
const { app, server } = require('../../../server');
const { drop } = require('../../../config/mongoose');

describe('collections/orders', () => {
    beforeEach(async () => {
        drop();
    });

    afterEach(() => {
        server.close();
    });

    it('should create an order', async () => {
        const user = await request(app)
            .post('/users/register')
            .send({
                email: 'user1@example.com',
                password: 'password123!',
            });

        const res = await request(app)
            .post('/order/create')
            .send({
                deadline: '30/12/2019',
                deliveryAddress: 'Rua as bilelas, N55',
                zipCode: '1000-230',
                city: 'Porto',
                country: 'Portugal',
                createdBy: user.data._id,
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('data');
    });
});
