import { OverviewQueries } from '../services/overview-queries';
import express from 'express';
import verifyAuthToken from './verify-auth-token';

const overview = new OverviewQueries();

const fiveMostPopularProducts = async (_req: express.Request, res: express.Response) => {
    try {
        const products = await overview.fiveMostPopularProducts();
        res.json(products);
    }
    catch (err) {
        res.status(500).send(`Error: ${err}`)
    }
}

const currentOrder = async (_req: express.Request, res: express.Response) => {
    try {
        const userId = parseInt(_req.query.user_id as string)
        const products = await overview.currentOrder(userId);
        res.json(products);
    }
    catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

const completedOrders = async (_req: express.Request, res: express.Response) => {
    try {
        const userId = parseInt(_req.query.user_id as string)
        const products = await overview.completedOrders(userId);
        res.json(products);
    }
    catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

const overviewRoutes = (app: express.Application) => {
    app.get('/five_most_popular_products', fiveMostPopularProducts);
    app.get('/current_order', verifyAuthToken, currentOrder);
    app.get('/completed_orders', verifyAuthToken, completedOrders);
}

export default overviewRoutes;