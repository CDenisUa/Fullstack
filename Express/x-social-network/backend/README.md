### Create new Mongo DB with Docker

*Stop all containers*
```
docker stop $(docker ps -q)
```

*Run container*
```
docker-compose up -d
```

*Check status of container*
```
docker ps
```

*Restart current container*
```
docker-compose restart
```

*Stop current container*
```
docker-compose down
```


### JWT
*Generate new JWT token*

```
 openssl rand -base64 32
```

*env backend*
```dotenv
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=admin
MONGO_DATABASE=x-social-network-container
PORT=4200
JWT_SECRET=7ab07eb17618414093da4098f8a0c8ff
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=https://console.cloudinary.com/
CLOUDINARY_API_KEY=https://console.cloudinary.com/
CLOUDINARY_API_SECRET=https://console.cloudinary.com/
```

*env frontend*
```dotenv


```