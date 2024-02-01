import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyAuthToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET || '')
        next();
    } catch (error) {
        res.status(401).send('Must provide a valid JWT')
    }
}

export default verifyAuthToken;