import { Order, OrderStore, OrderStatus } from "../../models/order";
import { User, UserStore } from "../../models/user";

const store = new OrderStore()
const userStore = new UserStore()

describe("Order model", () => {

    let newRecord: Order = {
        status: OrderStatus.completed,
        userId: 0 // set later, after creating user
    }

    let userRecord: User = {
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

    it('should have a edit method', () => {
        expect(store.edit).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('create method should add an order', async () => {
        const user = await userStore.create(userRecord);
        newRecord.userId = user.id || 0;
        const result = await store.create(newRecord);
        newRecord.id = result.id;
        expect(result.status).toEqual(newRecord.status);
    });

    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result[0].status).toEqual(newRecord.status);
    });

    it('show method should return the correct order', async () => {
        const result = await store.show(newRecord.userId, newRecord.status);
        expect(result.status).toEqual(newRecord.status);
    });

    it('edit method should update order', async () => {
        newRecord.status = OrderStatus.open
        const result = await store.edit(newRecord);
        expect(result.status).toEqual(OrderStatus.open);
    });

    it('delete method should remove the order', async () => {
        const result = await store.delete(newRecord.id ?? 0);
        expect(result.status).toEqual(newRecord.status);
    });
});