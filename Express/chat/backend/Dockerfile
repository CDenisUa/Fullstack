# syntax=docker/dockerfile:1.6
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

COPY tsconfig.json ./
COPY src ./src

# Cache TypeScript incremental build info
RUN --mount=type=cache,target=/app/.tsbuildcache npm run build

FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
RUN npm prune --omit=dev --no-audit --no-fund

COPY --from=builder /app/dist ./dist

EXPOSE 5001
CMD ["node", "dist/index.js"]
