import client from "../database";

export type Order = {
    id?: string;
    productIds: string[];
    productQuantities: number[];
    status: string;
    userId: string;
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release()
            return result.rows;             
        }
        catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const result = await conn.query(sql, [id]);
            conn.release()
            return result.rows[0];             
        }
        catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (product_ids, product_quantities, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *'
            const result = await conn.query(sql, [o.productIds, o.productQuantities, o.status, o.userId]);
            conn.release()
            return result.rows[0];             
        }
        catch (err) {
            throw new Error(`Could not create order from user ${o.userId}. Error: ${err}`)
        }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        // get order to see if it is open
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)'
            //@ts-ignore
            const conn = await client.connect()
    
            const result = await conn.query(ordersql, [orderId])
    
            const order = result.rows[0]
    
            if (order.status !== "open") {
            throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
            }
    
            conn.release()
        } catch (err) {
            throw new Error(`${err}`)
        }
    
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await client.connect()
    
            const result = await conn
                .query(sql, [quantity, orderId, productId])
    
            const order = result.rows[0]
    
            conn.release()
    
            return order
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }
}