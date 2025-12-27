**Overview**
- Chat application packaged as separate containers and connected via Docker Compose.
- Frontend: React + Vite + Tailwind/DaisyUI. Backend: Express (TypeScript). Database: MongoDB.

**Quick Start**
- Dev (live reload): `docker compose -f docker-compose.dev.yml up -d`
- Dev stop: `docker compose -f docker-compose.dev.yml down`
- Prod build & start: `docker compose up -d --build`
- Prod stop: `docker compose down`
- Switch modes safely: `docker compose down --remove-orphans`
- Status: `docker compose ps`
- Logs:
  - Dev: `docker compose -f docker-compose.dev.yml logs -f backend-dev` and `docker compose -f docker-compose.dev.yml logs -f frontend-dev`
  - Prod: `docker compose logs -f backend` and `docker compose logs -f frontend`

**Access**
- App URL: `http://localhost:5173`
- API from browser: `http://localhost:5173/api/...` (Nginx in the frontend container proxies to the backend service)
 - Dev mode: API base URL is `http://localhost:5001/api` (frontend dev server uses `VITE_API_URL`)

**Ports**
- Frontend (Nginx): `5173` on host → `80` in container
- Backend (Express): `5001`
- MongoDB: `27017`

**How It Works**
- Frontend container (Nginx) serves the built React app and reverse‑proxies all `/api` requests inside the Docker network to `http://backend:5001/api`.
- Backend container (Express) exposes routes under `/api/auth` and `/api/message`, sets `jwt` cookie (`httpOnly`, `SameSite=Lax`).
- Mongo container is reachable from the backend by the service name `mongo` inside the Compose network.
 - Dev containers: `frontend-dev` runs Vite dev server with HMR (`npm run dev -- --host`), `backend-dev` runs `tsx watch`. Source folders are bind-mounted; changes apply immediately without rebuilds.

**Dev Mode (HMR)**
- Start: `docker compose -f docker-compose.dev.yml up -d`
- Stop: `docker compose -f docker-compose.dev.yml down`
- Frontend: `http://localhost:5173` with HMR
- Backend: `http://localhost:5001` (API base `http://localhost:5001/api`)
- Logs: `docker compose -f docker-compose.dev.yml logs -f backend-dev` and `docker compose -f docker-compose.dev.yml logs -f frontend-dev`
- Behavior: source code in `frontend/` и `backend/` примонтирован внутрь контейнеров; любые изменения сразу отражаются.

**Production Mode**
- Build & start: `docker compose up -d --build`
- Stop: `docker compose down`
- Frontend доступен на `http://localhost:5173`
- Браузер вызывает API по пути `/api/...` — запросы проксируются Nginx внутрь сети к `http://backend:5001/api`.

**Switching Between Modes**
- Перед переключением всегда останавливай текущий стек:
  - `docker compose down --remove-orphans`
- Затем запускай нужный файл Compose (dev или prod).

**Environment**
- Backend reads `.env` (example):
  - `MONGODB_URI='mongodb://root:password@mongo:27017/chat-app?authSource=admin'`
  - `JWT_SECRET='...'`
  - `CLOUDINARY_*` if image uploads are enabled
- Compose overrides `MONGODB_URI` to target `mongo`. Local fallback: `mongodb://localhost:27017/chat`.

**API Endpoints**
- `POST /api/auth/signup` — sign up
- `POST /api/auth/login` — log in
- `POST /api/auth/logout` — log out
- `GET /api/auth/check` — check auth
- `PUT /api/auth/update-profile` — update profile picture
- `GET /api/message/users` — list users for sidebar
- `GET /api/message/:id` — fetch conversation messages
- `POST /api/message/send/:id` — send message

**Local Development (without Docker)**
- Backend: `cd backend && PORT=5001 npm run dev`
- Frontend: `cd frontend && npm run dev`
- API base URL for frontend: use `VITE_API_URL=/api` with a dev proxy, or `VITE_API_URL=http://localhost:5001/api` for direct calls.

**Troubleshooting**
- Port conflicts: adjust backend port in `docker-compose.yml` and proxy target in `frontend/nginx.conf`, then rebuild.
- Cookies not sent: ensure requests use same‑origin `/api` and `withCredentials` is enabled in the client.
- Database connection issues: verify `MONGODB_URI` and that the `mongo` service is running (`docker compose ps`).
 - Dev HMR not working: убедись, что запущен dev‑стек (`docker-compose.dev.yml`), порты `5173` и `5001` свободны, и используется `--host` в команде фронтенда.

**Project Structure**
- Frontend: `frontend/` (React + Vite; Nginx config at `frontend/nginx.conf`)
- Backend: `backend/` (TypeScript; build output in `dist/`)
- Compose: `docker-compose.yml` (services `frontend`, `backend`, `mongo`)
