# Phonebook Backend

This is the backend for a simple phonebook application. It provides a RESTful API to manage a list of contacts, including their names and phone numbers.

## Features

- **Get all contacts**: Retrieve the list of all persons in the phonebook.
- **Get a single contact**: Retrieve details of a specific person by their ID.
- **Add a new contact**: Add a new person to the phonebook.
- **Delete a contact**: Remove a person from the phonebook.
- **Info endpoint**: Get the total number of contacts and the current server time.

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
4. The server will run on `http://localhost:3001` by default.

## Environment Variables

- `PORT`: The port on which the server runs (default: `3001`).

## Notes

- The `id` for new contacts is generated randomly.
- The server includes error handling for unknown endpoints and validation for required fields.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
