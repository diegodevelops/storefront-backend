import client from "../database"
import { Order, OrderStatus } from "../models/order"
import { Product } from "../models/product"

export class OverviewQueries {

    // Get five most popular products
    async fiveMostPopularProducts(): Promise<Product[]> {
      try {
        const conn = await client.connect()
        const sql = 'SELECT * FROM products WHERE id IN (SELECT product_id FROM order_products GROUP BY product_id ORDER BY MAX(quantity) DESC LIMIT 5)'
        const result = await conn.query(sql)
        conn.release()
        return result.rows
      } catch (err) {
        throw new Error(`unable get users with orders: ${err}`)
      } 
    }

    // Get current order of a user 
    async currentOrder(userId: number): Promise<Order> {
        try {
          const conn = await client.connect()
          const sql = 'SELECT * FROM orders WHERE orders.user_id=($1) AND orders.status=($2)'
          const result = await conn.query(sql, [userId, OrderStatus.open])
          conn.release()
          return result.rows[0]
        } catch (err) {
          throw new Error(`unable current order of user ${userId}: ${err}`)
        } 
    }

    // Get completed orders of a user 
    async completedOrders(userId: number): Promise<Order[]> {
        try {
          const conn = await client.connect()
          const sql = 'SELECT * FROM orders WHERE orders.user_id=($1) AND orders.status=($2)'
          const result = await conn.query(sql, [userId, OrderStatus.completed])
          conn.release()
          return result.rows
        } catch (err) {
          throw new Error(`unable completed orders of a user ${userId}: ${err}`)
        } 
    }

}