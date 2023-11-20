# STAR Server

## Testing

### 1. Create a Test Database

- Login to your PostgreSQL Database:

  - `psql -U postgres` (or use your own postgres user)

- Enter your password (if any)

- Create a new Database:

  - `CREATE DATABASE star_test;`

- Quit from the PostgreSQL client

  - `\q`

### 2. Create a Test Environment File

- Make a copy of the `/server/.env.test.example` file, and rename it to `.env.test`

```sh
# the ENVironment that Node is running in:
NODE_ENV=test

# the Database Connection details:
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=(your own postgres user)
DATABASE_PASSWORD=(your own postgres password)
DATABASE_NAME=star_test

```

### 3. Apply a Migration to the Test Database

- `NODE_ENV=test npm run database:migration`

### 4. Run the Tests

- `npm run test`
