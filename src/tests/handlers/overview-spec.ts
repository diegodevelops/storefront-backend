import server from '../../server';
import supertest from 'supertest';
import dotenv from 'dotenv';
import { Product } from '../../models/product';
import addOverviewTestData from '../add-overview-test-data';
import deleteOverviewTestData from '../delete-overview-test-data';
import { Order, OrderStatus } from '../../models/order';

dotenv.config();

const request = supertest(server);

const testJWT = process.env.TEST_JWT || ''

describe('overview handler', () => {

    describe('401 status code', () => {

        it('no jwt to /current_order should produce 401 response', async () => {
            const resp = await request.get('/current_order');
            expect(resp.status).toBe(401);
        })

        it('no jwt to /completed_orders should produce 401 response', async () => {
            const resp = await request.get('/completed_orders');
            expect(resp.status).toBe(401);
        })
    })

    describe('200 status code', () => {

        // Deleting so our tables to avoid foreign key constraint errors 
        it('should delete overview test data first', async () => {
            await deleteOverviewTestData();
        })

        // We will add data through a separate script because
        // its quite a few
        it('should add overview test data', async () => {
            await addOverviewTestData();
        })

        it('get to /five_most_popular_products should return products', async () => {
            const resp = await request.get('/five_most_popular_products');
            const arr = resp.body as Product[]
            expect(resp.status).toBe(200);
            expect(arr.length).toBe(5);
            expect(arr[0].name).toBe('Sabila'); // see addOverviewTestData func
        })

        it('get to /current_order should return products', async () => {
            const resp = await request
            .get('/current_order?user_id=1')
            .set('authorization', `Bearer ${testJWT}`);

            const order = resp.body as Order
            expect(resp.status).toBe(200);
            expect(order).toBeDefined();
            expect(order.status).toBe(OrderStatus.open);
        })

        it('get to /completed_orders should return products', async () => {
            const resp = await request
            .get('/completed_orders?user_id=1')
            .set('authorization', `Bearer ${testJWT}`);

            const arr = resp.body as Order[]
            expect(resp.status).toBe(200);
            expect(arr).toBeDefined();
            expect(arr[0].status).toBe(OrderStatus.completed);
        })

        // Deleting just in case other tests need tables to be clean
        it('should delete overview test data at the end', async () => {
            await deleteOverviewTestData();
        })
    })
})