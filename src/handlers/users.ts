import { User, UserStore } from "../models/user";
import express from 'express';
import verifyAuthToken from "./verify-auth-token";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new UserStore();

const index = async (_req: express.Request, res: express.Response) => {
    try {
        const users = await store.index()
        res.json(users)
    }
    catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

const show = async (_req: express.Request, res: express.Response) => {
    try {
        const id = parseInt(_req.params.id);
        const user = await store.show(id)
        res.json(user)
    }
    catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

const create = async (_req: express.Request, res: express.Response) => {
    const user: User = {
        firstName: _req.body.firstName,
        lastName: _req.body.lastName,
        username: _req.body.username,
        password: _req.body.password
    }
    try {

        // validate username and password
        if (
            user.username.trim() === '' || 
            user.password?.trim() == ''
        ) {
            throw new Error()
        }
        
        const newUser = await store.create(user);
        const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET || '')
        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(user)
    }
}

const destroy = async (_req: express.Request, res: express.Response) => {
    try {
        const id = parseInt(_req.params.id);
        const user = await store.delete(id)
        res.json(user)
    }
    catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

const authenticate = async (_req: express.Request, res: express.Response) => {
    const user: User = {
        firstName: _req.body.firstName,
        lastName: _req.body.lastName,
        username: _req.body.username,
        password: _req.body.password,
    }
    try {

        // validate username and password
        if (
            user.username.trim() === '' || 
            user.password?.trim() == ''
        ) {
            throw new Error()
        }

        const u = await store.authenticate(user.username, user.password || '');
        const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET || '')
        res.json(token)
    } catch(err) {
        res.status(401)
        res.json(user)
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', create);
    app.delete('/users/:id', verifyAuthToken, destroy);
    app.post('/users/authenticate', authenticate);
}

export default userRoutes;
  
