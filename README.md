# Phonebook Backend

RESTful API for managing phonebook contacts, backed by MongoDB.

## Features

- **CRUD Operations**: Create, Read, Update, Delete contacts.
- **Info Endpoint**: Server stats and time.
- **Persistence**: MongoDB with Mongoose schemas.
- **Validation**: Enforces name/number requirements.
- **Error Handling**: Centralized handling for edge cases.

## Project Structure

- `controllers/`: Route handlers.
- `models/`: Mongoose schemas.
- `utils/`: Config, loggers, middleware.
- `request/`: API tests (VS Code REST).
- `dist/`: Frontend build.

## API Endpoints

### Persons
- `GET /api/persons`: List all contacts.
- `GET /api/persons/:id`: Get contact by ID.
- `POST /api/persons`: Add contact. (Body: `name`, `number`)
- `PUT /api/persons/:id`: Update contact.
- `DELETE /api/persons/:id`: Delete contact.

### System
- `GET /info`: Entry count and server time.

## Setup

1. **Clone & Install**:
   ```bash
   npm install
   ```
2. **Configure `.env`**:
   ```
   MONGODB_URL=<connection_string>
   PORT=3001
   ```
3. **Run**:
   ```bash
   npm run dev  # Development (Auto-reload)
   npm start    # Production
   ```

## Schema
Contacts require `name` and `number` (min 3 chars). `_id` is transformed to `id`.

## Dependencies
`express`, `mongoose`, `morgan`, `dotenv`.
