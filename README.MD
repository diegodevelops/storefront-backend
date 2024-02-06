# Storefront Backend 
An simple API for an online store, developed with Typescript and a few popular modules. Some of the modules and patterns used include:

- `espress` and its router for the app
- `jasmine` for unit tests
- `supertest` for unit tests involving networking
- `prettier` for formatting
- `eslint` for code styling
- `bcrypt` for password hashing and salting
- `jsonwebtoken` for authenticating API requests
- `pg` for postgres client
- `db-migrate` for migrations

# Setup and running app:

1. First make sure you have `psql` installed locally so you can run the initial database queries. You can follow this [guide](https://www.timescale.com/blog/how-to-install-psql-on-mac-ubuntu-debian-windows/) if you haven't done so already.

2. After installing psql locally, its time to create our user, and the dev and test databases. You can run these commands (on Mac) to do so:

- `sudo -u postgres psql` to access the query interface so we can run SQL queries. Then, psql will prompt for your computer password, and then for your `postgres` password (which typically is "postgres" too).

3. Now, your in the PostgreSQL interface and you can run `CREATE USER <POSTGRES_USER> WITH PASSWORD <POSTGRES_PASSWORD>;` to create our database user. Remember to save this two 2 values because where going to add them to our `.env` and `database.json` files.

4. Run `CREATE DATABASE <POSTGRES_DB>;` to create our development database and then a second time to create our test database. 

5. Finally, run `ALTER DATABASE <POSTGRES_DB> OWNER TO <POSTGRES_USER>;` and then a second time for the test database to give our user access to both databases.

5. Open your code editor and terminal, and clone this project.

6. Run `npm i` and `npm i --save-dev` to install all the dependencies since `node_modules` is not included in the repo.

7. After installing all the dependencies listed on the `package.json` file, we first need to create our `.env` and our `database.json` files. Create the `.env` file and add the username, passoword, dev database and test database names you chosed earlier, plus the other missing values below:

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=
POSTGRES_TEST_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
BCRYPT_PASSWORD=
SALT_ROUNDS=10
TOKEN_SECRET=secret-123456789
TEST_USERNAME=diegoperez
TEST_PASSWORD=hello123
TEST_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6IkRpZWdvIiwibGFzdE5hbWUiOiJQw6lyZXoiLCJ1c2VybmFtZSI6ImRpZWdvcGVyZXoiLCJwYXNzd29yZCI6ImhlbGxvMTIzIn19.sAUhORaa_l0WH9bwgzuGObssmz_36ShGnCfEYPOlGj8
ENV=dev
```

If you wan't to change `TOKEN_SECRET`, remember to also change `TEST_JWT` since the latter is signed with the former.

Now, create the `database.json` file and add the missing values:

```
{
    "dev": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "",
      "user": "",
      "password": ""
    },
    "test": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "",
      "user": "",
      "password": ""
    }
}
```

- User and password are the same for "dev" and "test" databases.

8. Run `db-migrate up` to run the migrations and create our tables.

9. And finally, run `npm run watch` to start the app on `0.0.0.0:3000`. Se `REQUIREMENTS.md` to see the endpoints you can call.



