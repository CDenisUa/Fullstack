### Start with Docker Compose

#### Docker Run
```sh
docker-compose up -d
```

#### Docker Check
```sh
docker ps
```

### Troubleshooting Docker Issues
If you encounter issues such as:
```
unable to get image 'mongo:latest': error during connect: Get "http://%2F%2F.%2Fpipe%2FdockerDesktopLinuxEngine/v1.47/images/mongo:latest/json": open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified.
```
Try the following solutions:

1. **Ensure Docker is Running**
    - Open Docker Desktop and make sure it is running.
    - If Docker is not running, start it and retry the command.

2. **Restart Docker Service**
   ```powershell
   net stop com.docker.service
   net start com.docker.service
   ```
   Or restart it via `services.msc` by finding **Docker Desktop Service**.

3. **Restart WSL (if using Windows Subsystem for Linux)**
   ```powershell
   wsl --shutdown
   ```
   Then restart Docker Desktop.

4. **Check Docker Engine Status**
   ```powershell
   docker version
   ```
   If there is no **Server** information, Docker Engine is not running.

5. **Reinstall Docker Desktop**
    - Uninstall Docker Desktop.
    - Reinstall it from [Docker's official site](https://www.docker.com/products/docker-desktop/).

---
### Start Build
```sh
cd backend && npm run build && npm run start
```

### Start Development Mode
Start projects separately:

#### Frontend
```
.eav
NEXT_PUBLIC_API_HOST_NAME=http://localhost:4200
```

#### Backend
```
.eav
MONGODB_URI=mongodb://admin:password@localhost:27017/product-store?authSource=admin
PORT=4200
```

