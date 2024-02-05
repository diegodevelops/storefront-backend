import client from "../database";

export type Order = {
    id?: number
    status: OrderStatus
    userId: number
}

type DbOrder = {
    id: number,
    status: OrderStatus,
    user_id: number
}

export enum OrderStatus {
    open = 'open',
    completed = 'completed'
}

export class OrderStore {

    private getOrderFrom(dbOrder: DbOrder): Order {
        return {
            id: dbOrder.id,
            status: dbOrder.status,
            userId: dbOrder.user_id
        }
    }

    async index(): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release()
            let arr: Order[] = []
            result.rows.map ( (r: DbOrder) => arr.push(this.getOrderFrom(r)) )
            return arr;             
        }
        catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *'
            const result = await conn.query(sql, [o.status, o.userId]);
            conn.release()
            return this.getOrderFrom(result.rows[0]);             
        }
        catch (err) {
            throw new Error(`Could not create order from user ${o.userId}. Error: ${err}`)
        }
    }

    async show(userId: number, status?: OrderStatus) {
        try {
            const conn = await client.connect();
            let sql = 'SELECT * FROM orders WHERE user_id=($1)'
            sql = (status) ? `${sql} AND status=($2)` : sql
            const result = await conn.query(sql, [userId, status]);
            conn.release()
            return this.getOrderFrom(result.rows[0]);             
        }
        catch (err) {
            throw new Error(`Could not create order from user ${userId}. Error: ${err}`)
        }
    }

    async edit(o: Order): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = 'UPDATE orders SET status=($1), user_id=($2) where id=($3) RETURNING *'
            const result = await conn.query(sql, [o.status, o.userId, o.id]);
            conn.release()
            return this.getOrderFrom(result.rows[0]);             
        }
        catch (err) {
            throw new Error(`Could not create order from user ${o.userId}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<Order> {
        try {
            const conn = await client.connect()
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *'
            const result = await conn.query(sql, [id])
            conn.release()
            return this.getOrderFrom(result.rows[0])
        } catch(err) {
            throw new Error(`unable delete order (${id}): ${err}`)
        }
    }

    async addProduct(quantity: number, orderId: number, productId: number): Promise<Order> {
        // get order to see if it is open
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(ordersql, [orderId])
            const order = result.rows[0]
            if (order.status !== OrderStatus.open) {
                throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
            }
            conn.release()
        } catch (err) {
            throw new Error(`${err}`)
        }
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            const conn = await client.connect()
            const result = await conn.query(sql, [quantity, orderId, productId])
            const order = this.getOrderFrom(result.rows[0])
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }
}