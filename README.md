# Chat-app API

Chat-app is a real-time messaging application built with AdonisJS for the backend and Nuxt 3 for the [frontend](https://github.com/matisbag/chat-app-frontend-vue), enabling users to manage conversations and send messages efficiently.

## Prerequisites

Before you begin, make sure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/en/download/) version 21.0 or above
- [PostgreSQL](https://www.postgresql.org/download/) for database storage

## Environnement setup

1. Duplicate the `.env.example` file and rename the copy to `.env`.
2. Open the `.env` file and fill in the appropriate values for each environment variable.

## Installation & Running the Project

After setting up the environment variables, follow these steps to install and run the project:

```bash
# Install dependencies
npm install

# Run database migrations
node ace migration:run

# Run database seeders (tests)
node ace db:seed

# Run the server
npm run dev
```
