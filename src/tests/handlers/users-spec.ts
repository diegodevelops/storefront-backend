import supertest from 'supertest';
import server from '../../server';
import dotenv from 'dotenv';
import { User } from '../../models/user';

dotenv.config();

const request = supertest(server);

describe('users handler', () => {

    describe('401 status code', () => {

        it('no jwt to /users should produce 401 response', async () => {
            const resp = await request.get('/users')
            expect(resp.status).toBe(401);
        })

        it('no jwt to /users/1 should produce 401 response', async () => {
            const resp = await request.get('/users/1')
            expect(resp.status).toBe(401);
        })

        it('no jwt to /users/1 (delete) should produce 401 response', async () => {
            const resp = await request.delete('/users/1')
            expect(resp.status).toBe(401);
        })

        it('no username or password to /authenticate (post) should produce 401 response', async () => {
            const resp = await request.post('/users/authenticate')
            expect(resp.status).toBe(401);
        })
    })

    describe('400 status code', () => {

        const testJWT = process.env.TEST_JWT || ''

        it('request for not existing user should produce error status', async () => {
            const resp = await request
            .get('/users/100')
            .set('authorization', `Bearer ${testJWT}`)

            expect(resp.status).toBe(400);
        })

        it('request to delete not existing user should produce error status', async () => {
            const resp = await request
            .delete('/users/100')
            .set('authorization', `Bearer ${testJWT}`)

            expect(resp.status).toBe(400);
        })

        it('empty post to /user should not create user', async () => {
            const resp = await request
            .post('/users')
            .send({})

            expect(resp.status).toBe(400);
        })
    })

    describe('200 status code', () => {

        const testJWT = process.env.TEST_JWT || ''
        const testUsername = process.env.TEST_USERNAME || ''
        const testPassword = process.env.TEST_PASSWORD || ''

        let newRecord: User = {
            firstName: 'Diego',
            lastName: 'Pérez',
            username: testUsername,
            password: testPassword
        }

        it('post to /users should create user', async () => {
            const resp = await request
            .post('/users')
            .send(newRecord)

            const token = resp.body

            expect(resp.status).toBe(200);
            expect(token).toBeDefined();
            expect(token).toBeInstanceOf(String)
        })

        it('get to /users should return users', async () => {
            const resp = await request
            .get('/users')
            .set('authorization', `Bearer ${testJWT}`)

            const arr = resp.body as User[]
            
            expect(resp.status).toBe(200);
            expect(arr.length).toBeGreaterThanOrEqual(1);
            expect(arr[0].username).toBe(newRecord.username);
        })

        it('get to /users/1 should return a user', async () => {
            const resp = await request
            .get('/users/1')
            .set('authorization', `Bearer ${testJWT}`)

            const user = resp.body as User

            expect(resp.status).toBe(200);
            expect(user.username).toBe(user.username);
        })

        it('post to /users/authenticate should return token', async () => {
            const resp = await request
            .post('/users/authenticate')
            .send({ username: testUsername, password: testPassword })

            const token = resp.body

            expect(resp.status).toBe(200);
            expect(token).toBeDefined();
            expect(token).toBeInstanceOf(String)
        })

        it('delete to /users/1 should delete user', async () => {
            const resp = await request
            .delete('/users/1')
            .set('authorization', `Bearer ${testJWT}`)

            const user = resp.body as User

            expect(resp.status).toBe(200);
            expect(user.username).toBe(user.username);
        })
    })
})