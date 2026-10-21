# Practical 5: MongoDB Integration and Schema Design with Mongoose
**Roll Number:** 23DCE056  
**Student Name:** Jignesh Katariya  
**Course/Branch:** Computer Engineering  

---

## Objective
To connect a MongoDB database to an Express server, enforce application-level schema validation using Mongoose ODM, implement a title-trimming pre-save hook and priority enum, and refactor RESTful CRUD endpoints to persist tasks in a live database.

---

## Project Structure
```text
task-manager-api-23DCE056/
├── models/
│   └── Task.js              <-- Mongoose Schema and Model definition
├── node_modules/
├── .env                     <-- Environment variables (Ignored in git)
├── .env.example             <-- Sample environment configuration
├── .gitignore
├── package.json
├── package-lock.json
├── server.js                <-- Main server configuration and routes
└── README.md                <-- Project documentation
```

---

## Architectural Diagram / Request Lifecycle
```text
Express App
    │ (loads .env configuration)
    ▼
Mongoose ODM (Connects via MONGO_URI)
    │
    ▼
MongoDB Database (Persists "tasks" collection)
    └── Schema Rules:
        ├── title (String, required, automatically trimmed via pre-hooks)
        ├── description (String, default empty string)
        ├── completed (Boolean, default false)
        ├── createdAt (Date, default Date.now)
        └── priority (String, enum: ['low', 'medium', 'high'], default 'medium')
```

---

## API Endpoints Documentation

### 1. Get All Tasks
- **Route:** `GET /tasks`
- **Description:** Retrieve all tasks stored in the MongoDB database.
- **Response Status:** `200 OK`
- **Response Example:**
  ```json
  [
    {
      "_id": "6a86b950b9415a8a5fa12f0a",
      "title": "Learn Node.js & Mongoose",
      "description": "Study schema validations and database hooks",
      "completed": false,
      "priority": "high",
      "createdAt": "2026-08-20T08:22:40.177Z",
      "__v": 0
    }
  ]
  ```

### 2. Get Task by ID
- **Route:** `GET /tasks/:id`
- **Description:** Retrieve a single task matching the provided 24-character hexadecimal MongoDB `ObjectId`.
- **Response Status:** `200 OK` (Success), `400 Bad Request` (Invalid ID format), `404 Not Found` (Task does not exist)
- **Response Example (200 OK):**
  ```json
  {
    "_id": "6a86b950b9415a8a5fa12f0a",
    "title": "Learn Node.js & Mongoose",
    "description": "Study schema validations and database hooks",
    "completed": false,
    "priority": "high",
    "createdAt": "2026-08-20T08:22:40.177Z",
    "__v": 0
  }
  ```

### 3. Create Task
- **Route:** `POST /tasks`
- **Headers:** `Content-Type: application/json` (Required)
- **Request Body:**
  ```json
  {
    "title": "  Prepare Practical Report  ",
    "description": "Complete PDF and document files",
    "priority": "medium"
  }
  ```
- **Response Status:** `201 Created` (Success), `400 Bad Request` (Validation error or missing JSON header)
- **Response Example (201 Created - Note the trimmed title and default values):**
  ```json
  {
    "_id": "6a86b982b9415a8a5fa12f0e",
    "title": "Prepare Practical Report",
    "description": "Complete PDF and document files",
    "completed": false,
    "priority": "medium",
    "createdAt": "2026-08-20T08:23:30.835Z",
    "__v": 0
  }
  ```

### 4. Update Task
- **Route:** `PUT /tasks/:id`
- **Headers:** `Content-Type: application/json` (Required)
- **Request Body:**
  ```json
  {
    "title": "  Prepare Practical Report (Updated)  ",
    "completed": true,
    "priority": "low"
  }
  ```
- **Response Status:** `200 OK` (Success), `400 Bad Request` (Invalid ID/body/headers/schema violation), `404 Not Found` (Task not found)
- **Response Example (200 OK):**
  ```json
  {
    "_id": "6a86b982b9415a8a5fa12f0e",
    "title": "Prepare Practical Report (Updated)",
    "description": "Complete PDF and document files",
    "completed": true,
    "priority": "low",
    "createdAt": "2026-08-20T08:23:30.835Z",
    "__v": 0
  }
  ```

### 5. Delete Task
- **Route:** `DELETE /tasks/:id`
- **Response Status:** `200 OK` (Success), `400 Bad Request` (Invalid ID format), `404 Not Found` (Task not found)
- **Response Example (200 OK):**
  ```json
  {
    "message": "Task deleted successfully.",
    "task": {
      "_id": "6a86b982b9415a8a5fa12f0e",
      "title": "Prepare Practical Report (Updated)",
      "description": "Complete PDF and document files",
      "completed": true,
      "priority": "low",
      "createdAt": "2026-08-20T08:23:30.835Z",
      "__v": 0
    }
  }
  ```

---

## Verification & Testing Guide

To test the application step-by-step using tools like Postman, Thunder Client, or cURL/PowerShell:

### 1. Starting the Server
Ensure your local MongoDB instance is running (default port `27017`) and start the application:
```bash
npm install
node server.js
```
The console will log:
* `Server is running and listening on http://localhost:5000`
* `MongoDB connected successfully`

### 2. Step-by-Step Test Scenarios

#### Scenario A: Fetch All Tasks (Initially empty or returns current DB records)
* **Action:** Send a `GET` request to `http://localhost:5000/tasks`.
* **Expected Response:** `200 OK` status with a JSON array of task documents.

#### Scenario B: Create a Valid Task (Trimming Hook & Priority Enum)
* **Action:** Send a `POST` request to `http://localhost:5000/tasks` with:
  * **Headers:** `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "title": "   Learn Mongoose ODM   ",
      "description": "Understand validation rules and pre-save hooks",
      "priority": "high"
    }
    ```
* **Expected Response:** `201 Created` status. The returned object will have leading/trailing whitespaces removed from the title (`"Learn Mongoose ODM"`), `completed` defaulted to `false`, and an auto-assigned `_id` and `createdAt` timestamp.

#### Scenario C: Create Task with Missing Title (Schema Validation Fail)
* **Action:** Send a `POST` request with:
  * **Body:** `{"description": "No title"}`
* **Expected Response:** `400 Bad Request` status containing structured validation details:
  ```json
  {
    "error": "Validation Error",
    "message": "The request data failed schema validation.",
    "details": {
      "title": "Task title is required."
    }
  }
  ```

#### Scenario D: Create Task with Invalid Priority (Enum Validation Fail)
* **Action:** Send a `POST` request with:
  * **Body:** `{"title": "Mongoose Task", "priority": "urgent"}`
* **Expected Response:** `400 Bad Request` status containing structured validation details:
  ```json
  {
    "error": "Validation Error",
    "message": "The request data failed schema validation.",
    "details": {
      "priority": "Priority must be restricted to 'low', 'medium', or 'high'."
    }
  }
  ```

#### Scenario E: Get Task by ID (Valid and Invalid formats)
1. **Valid Existing ID:** Send `GET /tasks/<Valid_Mongoose_Id>`. Expects `200 OK` with the task document.
2. **Invalid ID Format:** Send `GET /tasks/12345invalid`. Expects `400 Bad Request` indicating the ID format must be a valid 24-character hexadecimal string.
3. **Non-existent ID:** Send `GET /tasks/60d5f15f8c363c2240b2f0a1`. Expects `404 Not Found` in structured JSON format.

---

## Key Questions & Analysis (Viva Prep)

### 1. What is the purpose of a schema in a NoSQL database like MongoDB, given that MongoDB itself is schema-less?
MongoDB is schema-less by design, allowing documents in the same collection to have different fields and structures. However, in real-world applications, structured consistency is essential to prevent data corruption and bugs. 
Mongoose implements **application-level schema enforcement**. It acts as a gatekeeper on the application server: checking data types, enforcing required fields, applying defaults, and validating inputs before they reach the database. This ensures predictable data structure while still utilizing MongoDB's horizontal scaling and flexibility.

### 2. Why is it important to define required fields and default values at the schema level rather than relying on frontend validation alone?
Frontend validation is built to improve User Experience (UX) by giving users instant feedback (e.g., showing a red border on an empty form field). It is not a security boundary. An attacker or client can easily bypass frontend validation by using command-line tools like cURL, utility apps like Postman, or disabling browser JavaScript to send malicious/empty requests directly to the API endpoints. 
Defining required fields and defaults at the database schema level ensures that the server validates and cleanses every incoming request. It serves as the final, immutable line of defense for database integrity.

### 3. What happens internally when a document fails Mongoose validation—where is the request stopped?
When a Mongoose operation (like `Task.create()`, `.save()`, or `findByIdAndUpdate` with validation enabled) is executed, Mongoose runs validation checks locally on the Node.js server *before* sending any command to the MongoDB database. 
1. If validation fails, Mongoose cancels the database write operation.
2. Mongoose raises a `ValidationError` containing failure details for each field.
3. The promise is rejected, throwing an error into the route's `try/catch` block.
4. The router forwards it via `next(err)` to the global error middleware.
5. The global error handler intercepts the `ValidationError`, formats it into a clean JSON structure, and responds with a `400 Bad Request` status to the client, effectively halting the request lifecycle entirely at the server layer.
