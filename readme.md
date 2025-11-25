This service provides a simple REST API for creating and managing tasks.
It uses Node.js, Express, and Prisma with an underlying SQLite database.

The API is designed to be lightweight and easy to extend, with validation, structured routes, and a clear separation of concerns.

Prerequisites:
Node.js (v18+ recommended)
npm
SQLite (included automatically; no installation needed)

Setup

1. Install dependencies
   npm install

2. Environment variables
   Create a .env file in the root directory:
   DATABASE_URL="file:./dev.db"

3. Generate Prisma client
   npx prisma generate

4. Run database migrations
   npx prisma migrate dev --name init

5. Start the server
   For development with auto-reload: npm run dev
   Or standard start: npm start

The API will run at: http://localhost:3000

Endpoints: POST /tasks

Create a new task.

Request Body
{
"title": "Example task",
"status": "open",
"dueDate": "2025-11-13T14:43",
"description": "Optional details"
}

Responses
201 – Created
400 – Validation error

Project Structure
root
│── prisma/
│ ├── schema.prisma
│ └── migrations/
│── src/
│ └── utils/
│ └── validateTask.js
│── scripts/
│ └── clear.js/
│── server.js
│── package.json

Development Notes

CORS is enabled for local development and can be adjusted in server.js.
A global error handler is included to avoid server crashes.
Prisma Studio can be used to view the database:
npx prisma studio
You can clear the rows from the database with command:
node scripts/clear.js
