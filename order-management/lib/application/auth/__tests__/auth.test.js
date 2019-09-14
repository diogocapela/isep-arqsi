/* eslint-disable no-undef */
const request = require('supertest');
const { app, server } = require('../../../server');
const { drop } = require('../../../config/mongoose');

describe('collections/auth', () => {
    beforeAll(async () => {
        drop();
    });

    afterAll(() => {
        server.close();
    });

    it('should register a user with success', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                email: 'user1@example.com',
                password: 'password123!',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('data');
    });

    it('should not allow to register a user with the same email address', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                email: 'user1@example.com',
                password: 'password123!',
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });

    it('should login a user with success', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'user1@example.com',
                password: 'password123!',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
    });

    it('should not login a user with an invalid password', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'user1@example.com',
                password: 'invalidPassword',
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });
});
