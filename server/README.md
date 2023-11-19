## 1. Test Database

- Login to your PostgreSQL Database:

    - `psql -U postgres` (or use your own postgres user)

- Enter your password (if any)

- Create a new Database:

    - `CREATE DATABASE star_test;`

- Quit from the PostgreSQL client

    - `\q`

## 2. Config file

- Make a copy of the `/server/.env.test.example` file, and rename it to `.env.test`

## 3. Push the migrations

- `NODE_ENV=test npm run database:migration`

## 4. Run the tests

- `npm run test`
