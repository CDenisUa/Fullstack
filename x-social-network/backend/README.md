### Create new Mongo DB with Docker


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