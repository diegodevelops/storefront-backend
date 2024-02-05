import { Product, ProductStore } from "../../models/product";

const store = new ProductStore()

describe("Product model", () => {

    let newRecord: Product = {
        name: "Sabila",
        price: 20,
        category: 'plants'
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

    it('create method should add a product', async () => {
        const result = await store.create(newRecord);
        newRecord.id = result.id;
        expect(result.name).toEqual(newRecord.name);
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result[0].name).toEqual(newRecord.name);
    });

    it('index with input category "plants" method should return a list of products', async () => {
        const result = await store.index('plants');
        expect(result[0].name).toEqual(newRecord.name);
    });

    it('show method should return the correct product', async () => {
        const result = await store.show(newRecord.id || 0);
        expect(result.name).toEqual(newRecord.name);
    });

    it('delete method should remove the product', async () => {
        const result = await store.delete(newRecord.id || 0)
        expect(result.name).toEqual(newRecord.name);
    });
});