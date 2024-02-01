import { Product, ProductStore } from '../models/product';
import express from 'express';
import verifyAuthToken from "./verify-auth-token";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new ProductStore();

const index = async (_req: express.Request, res: express.Response) => {
    try {
        const products = await store.index()
        res.json(products)
    }
    catch (err) {
        res.status(500).send(`Error: ${err}`)
    }
}

const show = async (_req: express.Request, res: express.Response) => {
    try {
        const id = parseInt(_req.params.id);
        const product = await store.show(id)
        res.json(product)
    }
    catch (err) {
        res.status(500).send(`Error: ${err}`)
    }
}

const create = async (_req: express.Request, res: express.Response) => {
    const product: Product = {
        name: _req.body.name,
        price: Number(_req.body.price),
        category: _req.body.category
    }
    try {
        const newProduct = await store.create(product);
        res.json(newProduct);
    } catch (err) {
        res.status(400);
        res.json(product)
    }
}

const destroy = async (_req: express.Request, res: express.Response) => {
    try {
        const id = parseInt(_req.params.id);
        const product = await store.delete(id)
        res.json(product)
    }
    catch (err) {
        res.status(500).send(`Error: ${err}`)
    }
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
    app.delete('/products/:id', verifyAuthToken, destroy);
}

export default productRoutes;
  
