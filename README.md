# NodeJS Homework 1 – Student & Class API

A simple Node.js HTTP server that manages **students** and **classes**.  
Supports reading/writing data to **JSON files** so it persists across restarts.

---

## Features

- ✅ GET endpoints for listing students/classes
- ✅ Random student/class endpoints (`/students/random`, `/classes/random`)
- ✅ POST endpoints for adding new students/classes
- ✅ Data persistence via `data/students.json` and `data/classes.json`
- ✅ Custom error handling and proper HTTP status codes
- ✅ Uses `uuid`, `lodash`, and `chalk` for IDs, utilities, and logging

---

## Project Structure

```
.
├── data/
│   ├── students.json
│   └── classes.json
├── server.js
├── package.json
└── README.md
```

---

## Installation

1. Clone or copy this project.
2. Initialize and install dependencies:

```bash
npm init -y
npm install uuid@^9.0.1 lodash@4.17.21 chalk@~4.1.2
```

---

## Running

```bash
node server.js
```

Server runs at **http://localhost:3000**

---

## API Endpoints

### Students
- `GET /students` → list all students
- `GET /students/random` → get a random student
- `POST /students` → add a new student  
  Example body:
  ```json
  { "name": "Diana" }
  ```

### Classes
- `GET /classes` → list all classes
- `GET /classes/random` → get a random class
- `POST /classes` → add a new class  
  Example body:
  ```json
  { "name": "Biology 101" }
  ```

---

## Data Persistence

- Students and classes are stored in:
  - `data/students.json`
  - `data/classes.json`
- On each POST, the server updates the corresponding JSON file.
- Restarting the server **does not lose data**.

---

## Notes

- Only JSON requests are accepted (`Content-Type: application/json`).
- Invalid requests return `400` with a helpful error message.
- Methods other than GET/POST return `405`.

---

## License

Educational use only.
