--- Start project ---

docker-compose up --build

--- .env ---
MONGODB_URI=mongodb://mongo:27017/todo_db
DEBUG=true

The .env file should be placed in the root of the project.