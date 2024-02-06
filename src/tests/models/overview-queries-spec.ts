import { OrderStatus } from "../../models/order";
import { Product } from "../../models/product";
import { OverviewQueries } from "../../services/overview-queries";
import addOverviewTestData from "../add-overview-test-data";
import deleteOverviewTestData from "../delete-overview-test-data";

const store = new OverviewQueries();

describe('OverviewQueries service', () => {

    // Deleting so our tables to avoid foreign key constraint errors 
    it('should delete overview test data first', async () => {
        await deleteOverviewTestData();
    })

    // We will add data through a separate script because
    // its quite a few
    it('should add overview test data', async () => {
        await addOverviewTestData();
    })

    it('should have fiveMostPopularProducts method', () => {
        expect(store.fiveMostPopularProducts).toBeDefined();
    })

    it('should have currentOrder method', () => {
        expect(store.currentOrder).toBeDefined();
    })

    it('should have completedOrders method', () => {
        expect(store.completedOrders).toBeDefined();
    })

    it('fiveMostPopularProducts method should return 5 different products', async () => {
        const res = await store.fiveMostPopularProducts();
        const ids = new Set(res.map( (p: Product) => p.id || 0 ))
        expect(ids.size).toBe(5);
    })

    it('currentOrder method should return an open order', async () => {
        const res = await store.currentOrder(1); // see addOverviewTestData func
        expect(res.status).toBe(OrderStatus.open);
    })

    it('completedOrders method should return at least 1 closed order', async () => {
        const res = await store.completedOrders(1);
        expect(res.length).toBeGreaterThanOrEqual(1);
        expect(res[0].status).toBe(OrderStatus.completed);
    })

    // Deleting just in case other tests need tables to be clean
    it('should delete overview test data at the end', async () => {
        await deleteOverviewTestData();
    })
    
})