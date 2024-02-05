import client from "../database";

const deleteOverviewTestData = async () => {
    try {
        let sql = 'TRUNCATE TABLE users, products, orders, order_products RESTART IDENTITY';
        const conn = await client.connect();
        await conn.query(sql);
        conn.release;
    }
    catch (err) {
        throw new Error(`Couldn delete data from tables: ${err}`)
    }
}

export default deleteOverviewTestData;
