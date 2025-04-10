APP_NAME=ai-backend
DB_CONTAINER=learning-db
DOCKER_IMAGE=ai-backend:latest
PORT=8000
DB_PORT=5432
ENV_FILE=../.env

build:
	docker build -t $(DOCKER_IMAGE) .

db:
	docker rm -f learning-db || true
	docker run -d \
		--name learning-db \
		--network learning-net \
		-e POSTGRES_USER=user \
		-e POSTGRES_PASSWORD=password \
		-e POSTGRES_DB=ai_db \
		-p 5433:5432 \
		postgres:15


run:
	docker rm -f $(APP_NAME) || true
	docker run -d \
		--name $(APP_NAME) \
		--network learning-net \
		-p $(PORT):8000 \
		--env-file $(ENV_FILE) \
		$(DOCKER_IMAGE)

logs:
	docker logs -f $(APP_NAME)

shell:
	docker exec -it $(APP_NAME) /bin/bash

psql:
	docker exec -it $(DB_CONTAINER) psql -U user -d ai_db

stop:
	docker stop $(APP_NAME) $(DB_CONTAINER) || true

clean:
	docker rm -f $(APP_NAME) $(DB_CONTAINER) || true
	docker system prune -f
