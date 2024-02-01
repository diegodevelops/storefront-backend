import supertest from 'supertest';
import server from '../../server';

const request = supertest(server);

describe('users handler', () => {

    describe('401 status code', () => {

        it('no jwt to /users should produce 401 response', async () => {
            const resp = await request.get('/users')
            expect(resp.status).toBe(401);
        })

        it('no jwt to /users/1 should produce 401 response', async () => {
            const resp = await request.get('/users')
            expect(resp.status).toBe(401);
        })

        it('no jwt to /users (post) should produce 401 response', async () => {
            const resp = await request.post('/users')
            expect(resp.status).toBe(401);
        })
    })
})