import client from "../database"
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD || '';
const saltRounds = process.env.SALT_ROUNDS || '';

export type User = {
    id?: string,
    firstName: string,
    lastName: string,
    password: string
}

export class UserStore {

    async index(): Promise<User[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
          } catch (err) {
            throw new Error(`unable get users: ${err}`)
          } 
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`unable show user ${id}: ${err}`)
        }
    }

    async delete(id: string): Promise<User> {
        try {
            const conn = await client.connect()
            const sql = 'DELETE FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id])
            const product = result.rows[0]
            conn.release()
            return product
        } catch(err) {
            throw new Error(`unable delete user (${id}): ${err}`)
        }
    }

    async create(u: User): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (first_name, last_name, password_digest) VALUES ($1, $2, $3) RETURNING *';
            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds)
            );
            
            const result = await conn.query(sql, [u.firstName, u.lastName, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`unable to create user (${u.firstName}): ${err}`)
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await client.connect()
        const sql = 'SELECT password_digest FROM users WHERE username=($1)'
        const result = await conn.query(sql, [username])
        if(result.rows.length) {
            const user = result.rows[0]
            console.log(user)

            if (bcrypt.compareSync(password+pepper, user.password_digest)) {
                return user
            }
        }
        return null
    }
}