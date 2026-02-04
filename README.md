# Phonebook Backend

This is the backend for a simple phonebook application. It provides a RESTful API to manage a list of contacts, including their names and phone numbers. All data is persisted in a MongoDB database.

## Features

- **Get all contacts**: Retrieve the list of all persons in the phonebook.
- **Get a single contact**: Retrieve details of a specific person by their ID.
- **Add a new contact**: Add a new person to the phonebook.
- **Update a contact**: Update an existing person's information.
- **Delete a contact**: Remove a person from the phonebook.
- **Info endpoint**: Get the total number of contacts and the current server time.
- **MongoDB integration**: Full database persistence using Mongoose with schema validation.
- **Error handling**: Comprehensive error handling for malformed requests and database errors.

## Endpoints

### `GET /api/persons`

Returns the list of all persons in the phonebook.

### `GET /api/persons/:id`

Returns the details of a person with the specified ID.

**Error responses:**

- `404`: Person not found
- `400`: Malformatted ID

### `POST /api/persons`

Adds a new person to the phonebook. The request body must include:

- `name` (string, minimum 3 characters): The name of the person.
- `number` (string, minimum 3 characters): The phone number of the person.

**Error responses:**

- `404`: Missing name or number

### `PUT /api/persons/:id`

Updates an existing person's information. The request body should include:

- `name` (string): The updated name of the person.
- `number` (string): The updated phone number of the person.

**Error responses:**

- `404`: Person not found
- `400`: Malformatted ID

### `DELETE /api/persons/:id`

Deletes the person with the specified ID.

**Response:**

- `204`: Successfully deleted

### `GET /info`

Returns the total number of contacts in the phonebook and the current server time.

## Middleware

- **Morgan**: Logs HTTP requests, including the request body in a custom format.
- **Express JSON**: Parses incoming JSON request bodies.
- **Static Files**: Serves static files from the `dist` directory.
- **Error Handler**: Centralized error handling for database and validation errors.
- **Unknown Endpoint Handler**: Returns 404 for undefined routes.

## How to Run

1. Clone the repository.
2. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URL=<your-mongodb-connection-string>
   PORT=3001
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
   For development with auto-reload:
   ```bash
   npm run dev
   ```
5. The server will run on `http://localhost:3001` by default.

## Database Schema

The application uses a Mongoose schema with the following structure:

```javascript
{
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 3,
    required: true
  }
}
```

The schema automatically transforms MongoDB's `_id` to `id` in JSON responses and removes the `__v` version key.

## Dependencies

- **Express**: Web framework for Node.js
- **Mongoose**: MongoDB object modeling for Node.js
- **Morgan**: HTTP request logger middleware
- **dotenv**: Environment variable management

## Environment Variables

- `MONGODB_URL`: MongoDB connection string (required)
- `PORT`: The port on which the server runs (default: `3001`)

## Error Handling

The application includes comprehensive error handling:

- **CastError**: Returns `400` with "malformatted id" message for invalid MongoDB IDs
- **Unknown Endpoints**: Returns `404` with "unknown endpoint" message
- **Validation Errors**: Handled by Mongoose schema validation

## Notes

- All contacts are stored in MongoDB with persistent storage.
- The database connection uses IPv4 (`family: 4`) for compatibility.
- Schema validation ensures names and numbers are at least 3 characters long.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
