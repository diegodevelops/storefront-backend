import client from "../database"
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD || '';
const saltRounds = process.env.SALT_ROUNDS || '';

export type User = {
    id?: number,
    firstName: string,
    lastName: string,
    password?: string
    passwordDigest?: string
}

type DbUser = {
    id: number,
    first_name: string,
    last_name: string,
    password_digest: string
}

export class UserStore {

    private getUserFrom(dbUser: DbUser): User {
        return {
            id: dbUser.id,
            firstName: dbUser.first_name,
            lastName: dbUser.last_name,
            passwordDigest: dbUser.password_digest
        }
    }

    async index(): Promise<User[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            let arr: User[] =[]
            result.rows.map ((r: DbUser ) => arr.push(this.getUserFrom(r) ))
            return arr;
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
            return this.getUserFrom(result.rows[0])
        } catch (err) {
            throw new Error(`unable show user ${id}: ${err}`)
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const conn = await client.connect()
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *'
            const result = await conn.query(sql, [id])
            conn.release()
            return this.getUserFrom(result.rows[0])
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
            conn.release();
            return this.getUserFrom(result.rows[0])
        }
        catch (err) {
            throw new Error(`unable to create user (${u.firstName}): ${err}`)
        }
    }

    async authenticate(firstName: string, password: string): Promise<User | null> {
        const conn = await client.connect()
        const sql = 'SELECT * FROM users WHERE first_name=($1)'
        const result = await conn.query(sql, [firstName])
        if(result.rows.length) {
            const user = this.getUserFrom(result.rows[0])

            if (bcrypt.compareSync(password+pepper, user.passwordDigest || '')) {
                return user
            }
        }
        return null
    }
}