# URL Shortener Server

## Get started locally

### Prerequisite

- Postgres DB

Start postgres db using docker or get a cloud instance using https://neon.tech/

```
docker run --name shortenerdb -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres
```

### Steps

1. Copy env variables

```
cp .env.example .env
```

Ensure the environment variables are correct

2. Use correct node version

```
nvm use
```

if asked download required node version

```
nvm install <node-version>
```

3. Install node modules

```
yarn
```

4. Migrate the DB

```
yarn prisma:migrate
```

5. Generate Prisma client

```
prisma:generate
```

6. Start the server

```
yarn dev
```
