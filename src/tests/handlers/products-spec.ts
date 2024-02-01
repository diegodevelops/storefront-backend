import supertest from 'supertest';
import server from '../../server';
import dotenv from 'dotenv';
import { Product } from '../../models/product';

dotenv.config();

const request = supertest(server);

describe('products handler', () => {

    describe('401 status code', () => {

        it('no jwt to /products should produce 401 response', async () => {
            const resp = await request.post('/products')
            expect(resp.status).toBe(401);
        })
    })

    describe('200 status code', () => {

        const testJWT = process.env.TEST_JWT || ''

        const newRecord: Product = {
            name: 'Sabila',
            price: 20,
            category: 'plants'
        }
        
        it('post to /products should create product', async () => {
            const resp = await request
            .post('/products')
            .set('authorization', `Bearer ${testJWT}`)
            .send(newRecord)

            const product = resp.body as Product

            expect(resp.status).toBe(200);
            expect(product.name).toBe(newRecord.name);
        })
    
    })
})