import { User, UserStore } from "../../models/user";

const store = new UserStore()

describe("User model", () => {

    let newRecord: User = {
        firstName: 'Diego',
        lastName: 'Pérez',
        username: 'diegoperez',
        password: 'hello123'
    }

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('create method should add a user', async () => {
        const result = await store.create(newRecord);
        newRecord.id = result.id;
        expect(result.firstName).toEqual(newRecord.firstName);
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('show method should return the correct user', async () => {
        const result = await store.show(newRecord.id || 0);
        expect(result.firstName).toEqual(newRecord.firstName);
    });

    it('authenticate method should return the correct user', async () => {
        const result = await store.authenticate(newRecord.username, newRecord.password || '');
        const user = result as User
        expect(user.firstName).toEqual(newRecord.firstName);
    });

    it('delete method should remove the user', async () => {
        const result = await store.delete(newRecord.id || 0)
        expect(result.firstName).toEqual(newRecord.firstName);
    });
});