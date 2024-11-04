### Start with docker-compose

#### Docker Run
```
docker-compose up -d
```
#### Docker check
```
docker ps
```

### Start Build 
```
cd backend && npm run build && npm run start
```

### Start dev

Start projects separately

### Frontend
```
.eav

NEXT_PUBLIC_API_HOST_NAME=http://localhost:4200
```

### Backend
```
.eav
 
MONGODB_URI=mongodb://admin:password@localhost:27017/product-store?authSource=admin
PORT=4200
```