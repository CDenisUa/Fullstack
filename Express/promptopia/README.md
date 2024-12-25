# Managing MongoDB Container for Your Next.js Application

This guide provides instructions on how to stop and restart the MongoDB container named `promptopia-mongo` for your Next.js application.

## Stopping the Container

To stop the running MongoDB container, use the following command in your terminal:

```bash
docker stop promptopia-mongo
```

## Starting the Container

```bash
docker start promptopia-mongo

```

## .env

```dotenv
GOOGLE_CLIENT_ID=64293796158-7nnhr5v8gi37nkq0t7ug3jo6cf8bha6t.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

MONGODB_URL=mongodb://admin:secret@localhost:27017
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=secret

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=eAydm8EXM1tAWMSvuaqB9fY+9xXwVkmyfv6CBo97fHQ=
```

## Starting the Container (If Removed or First Time Setup)
### Unix
```bash
docker run --name promptopia-mongo \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  -p 27017:27017 \
  -d mongo:latest
```

### Windows
```bash
docker run `
--name promptopia-mongo `
-e MONGO_INITDB_ROOT_USERNAME=admin `
-e MONGO_INITDB_ROOT_PASSWORD=secret `
-p 27017:27017 `
-d mongo:latest
```