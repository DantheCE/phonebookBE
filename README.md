# Phonebook Backend

This is the backend for a simple phonebook application. It provides a RESTful API to manage a list of contacts, including their names and phone numbers.

## Features

- **Get all contacts**: Retrieve the list of all persons in the phonebook.
- **Get a single contact**: Retrieve details of a specific person by their ID.
- **Add a new contact**: Add a new person to the phonebook.
- **Delete a contact**: Remove a person from the phonebook.
- **Info endpoint**: Get the total number of contacts and the current server time.
- **MongoDB support**: Database operations using Mongoose for persistent storage.

## Endpoints

### `GET /api/persons`
Returns the list of all persons in the phonebook.

### `GET /api/persons/:id`
Returns the details of a person with the specified ID.

### `POST /api/persons`
Adds a new person to the phonebook. The request body must include:
- `name` (string): The name of the person.
- `number` (string): The phone number of the person.

### `DELETE /api/persons/:id`
Deletes the person with the specified ID.

### `GET /info`
Returns the total number of contacts in the phonebook and the current server time.

## Middleware

- **Morgan**: Logs HTTP requests, including the request body.
- **Static Files**: Serves static files from the `dist` directory.

## How to Run

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   For development with auto-reload:
   ```bash
   npm run dev
   ```
4. The server will run on `http://localhost:3001` by default.

## MongoDB Database Operations

The project includes a `mongo.js` script for interacting with the MongoDB database.

### Viewing all contacts
```bash
node mongo.js <password>
```
This will connect to the database and display all contacts in the phonebook.

### Adding a new contact
```bash
node mongo.js <password> "<name>" "<number>"
```
This will add a new contact to the database. Use double quotes if the name contains spaces.

## Dependencies

- **Express**: Web framework for Node.js
- **Mongoose**: MongoDB object modeling for Node.js
- **Morgan**: HTTP request logger middleware

## Environment Variables

- `PORT`: The port on which the server runs (default: `3001`).

## Notes

- The `id` for new contacts is generated randomly.
- The server includes error handling for unknown endpoints and validation for required fields.
- Contacts are currently stored in memory (in-memory array). Use `mongo.js` for database operations.
- The `mongo.js` script requires the MongoDB database password as a command-line argument.
- Name validation: New contacts must have unique names (duplicate names are not allowed).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
