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
    async currentOrder(username: string): Promise<Order> {
        try {
          const conn = await client.connect()
          const sql = 'SELECT orders.* FROM orders INNER JOIN users ON orders.user_id=users.id WHERE users.username=($1) AND orders.status=($2)'
          const result = await conn.query(sql, [username, OrderStatus.open])
          conn.release()
          return result.rows[0]
        } catch (err) {
          throw new Error(`unable current order of user ${username}: ${err}`)
        } 
    }

    // Get completed orders of a user 
    async completedOrders(username: string): Promise<Order[]> {
        try {
          const conn = await client.connect()
          const sql = 'SELECT orders.* FROM orders INNER JOIN users ON orders.user_id=users.id WHERE users.username=($1) AND orders.status=($2)'
          const result = await conn.query(sql, [username, OrderStatus.completed])
          conn.release()
          return result.rows
        } catch (err) {
          throw new Error(`unable completed orders of a user ${username}: ${err}`)
        } 
    }

}