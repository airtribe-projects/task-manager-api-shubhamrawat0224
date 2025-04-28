# Task Manager API

A RESTful API for managing tasks, built with Node.js and Express.

## Features

- Create, read, update, and delete tasks
- RESTful API endpoints
- Express middleware for logging
- Built-in testing with tap
- Development mode with nodemon

## Prerequisites

- Node.js version 18 or higher
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd task-manager-api
```

2. Install dependencies:

```bash
npm install
```

## Project Structure

```
task-manager-api/
├── app.js              # Main application file
├── controllers/        # Route controllers
├── middleware/         # Custom middleware
├── routers/           # Route definitions
├── test/              # Test files
└── package.json       # Project dependencies and scripts
```

## Available Scripts

- `npm run dev`: Start the development server with nodemon
- `npm test`: Run the test suite
- `npm run pretest`: Check Node.js version compatibility

## API Endpoints

The API is available at `/api/v1/tasks` with the following endpoints:

- `GET /`: Get all tasks
- `GET /:id`: Get a specific task by ID
- `POST /`: Create a new task
- `PUT /:id`: Update a task
- `DELETE /:id`: Delete a task

## Development

To start the development server:

```bash
npm run dev
```

The server will start on port 3000 by default.

## Testing

To run the test suite:

```bash
npm test
```

## License

ISC License

## Author

Airtribe
