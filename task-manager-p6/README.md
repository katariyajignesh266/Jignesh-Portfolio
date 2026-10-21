# Practical 7: Authentication and Middleware Pipeline

**Course Outcomes (CO) & Program Outcomes (PO):** CO2, CO6 / PO3, PO5  
**Objective:** Implement JWT-based authentication, bcrypt password hashing, and server-side request validation as part of the Express middleware pipeline.

---

## 1. Architecture & Middleware Pipeline

```
                                  Client Request
                                         │
                                         ▼
                                  [Express App]
                                         │
                                         ▼
                         [cors() Global Middleware]
                                         │
                                         ▼
                     [express.json() Body Parser Middleware]
                                         │
                                         ▼
                         [logger Request Logging Middleware]
                                         │
                                         ▼
                   [requireJsonContentType Validation Middleware]
                                         │
         ┌───────────────────────────────┴───────────────────────────────┐
         ▼                                                               ▼
   /api/auth Routes                                               /api/tasks Routes
         │                                                               │
   [Input Validation]                                           [Auth Middleware]
   (validateRegister / validateLogin)                           (Verifies JWT Bearer token)
         │                                                      (Sets req.user = decoded)
         ▼                                                               │
   [Auth Controller]                                                     ▼
   • POST /register (bcrypt hash -> save User -> 201)           [Input Validation]
   • POST /login    (bcrypt compare -> sign JWT -> 200)         (validateTaskInput: title & priority)
   • GET  /me       [Auth Middleware] -> returns user profile            │
                                                                         ▼
                                                                [Task Controller]
                                                                • GET    /api/tasks
                                                                • POST   /api/tasks
                                                                • GET    /api/tasks/:id
                                                                • PUT    /api/tasks/:id
                                                                • DELETE /api/tasks/:id
                                                                         │
                                         ┌───────────────────────────────┘
                                         ▼
                             [Global Error Handler]
                                         │
                                         ▼
                          JSON Response to Client (2xx / 4xx / 5xx)
```

---

## 2. Key Security Concepts & Analysis

### Why Passwords Must Be Hashed With bcrypt (Not Plain SHA or Plaintext)

1. **Slow by Design (Key Stretching):** Standard algorithms like SHA-256 or MD5 are designed for high-speed file checksums. An attacker with a GPU can compute billions of SHA-256 hashes per second. `bcrypt` utilizes the Blowfish cipher and configurable work factors (salt rounds, default 10) to make brute-force and dictionary attacks computationally infeasible.
2. **Automatic Salt Generation:** `bcrypt` generates a unique random cryptographic salt for every password. This defeats precomputed lookup attacks like Rainbow Tables and ensures identical passwords result in completely different stored hashes.

### What the Authentication Middleware Verifies

- Checks the `Authorization` header for `Bearer <token>` format.
- Uses `jwt.verify(token, process.env.JWT_SECRET)` to verify that:
  - The token was signed using the server's private secret and hasn't been tampered with.
  - The token is within its expiration window (1 hour).
- If the token is missing or expired, `jwt.verify()` throws, which the middleware catches safely and responds with `401 Unauthorized` without crashing the Express server.

### Why Server-Side Input Validation Is Essential

- Frontend validation (HTML5 form checks, React state checks) is purely for **user experience**, not security.
- Any client (Postman, `curl`, custom scripts, attackers) can bypass frontend checks and submit malformed or malicious payloads directly to HTTP endpoints.
- Server-side validation acts as the gatekeeper, preventing corrupt data from ever reaching business logic or MongoDB.

---

## 3. Endpoints Reference

### Authentication Endpoints (`/api/auth`)

| Method | Endpoint             | Access          | Description                                                           |
| ------ | -------------------- | --------------- | --------------------------------------------------------------------- |
| `POST` | `/api/auth/register` | Public          | Register new user with email & password (hashed via bcrypt)           |
| `POST` | `/api/auth/login`    | Public          | Verify credentials and receive signed JWT (1h expiry)                 |
| `GET`  | `/api/auth/me`       | Protected (JWT) | Supplementary problem: Get logged-in user details (password excluded) |

### Protected Task Endpoints (`/api/tasks`)

> All task endpoints require the `Authorization: Bearer <token>` header.

| Method   | Endpoint         | Access    | Validation                                      | Description                        |
| -------- | ---------------- | --------- | ----------------------------------------------- | ---------------------------------- |
| `GET`    | `/api/tasks`     | Protected | Auth                                            | Get tasks for authenticated user   |
| `POST`   | `/api/tasks`     | Protected | Auth + `validateTaskInput`                      | Create task with non-empty `title` |
| `GET`    | `/api/tasks/:id` | Protected | Auth + `validateObjectId`                       | Get task by MongoDB `_id`          |
| `PUT`    | `/api/tasks/:id` | Protected | Auth + `validateObjectId` + `validateTaskInput` | Update task fields                 |
| `DELETE` | `/api/tasks/:id` | Protected | Auth + `validateObjectId`                       | Delete task                        |

---

## 4. Postman Step-by-Step Testing Guide

### Step 1: User Registration

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/register`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "email": "student@example.com",
    "password": "Password123"
  }
  ```
- **Expected Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "6ab408...",
      "email": "student@example.com"
    }
  }
  ```

### Step 2: User Login

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/login`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "email": "student@example.com",
    "password": "Password123"
  }
  ```
- **Expected Response (200 OK):** Copy the `token` string returned in the JSON response.

### Step 3: Access Protected Task Route (Without Token — Verification of Failure)

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/tasks`
- **Expected Response (401 Unauthorized):**
  ```json
  {
    "success": false,
    "error": "Access denied. No token provided or malformed authorization header (expected \"Bearer <token>\")."
  }
  ```

### Step 4: Access Protected Route With Token

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/tasks`
- **Headers:**
  - `Authorization`: `Bearer <paste_your_token_here>`
- **Expected Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 0,
    "data": []
  }
  ```

### Step 5: Test /api/auth/me Endpoint (Supplementary Problem 1)

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/auth/me`
- **Headers:**
  - `Authorization`: `Bearer <paste_your_token_here>`
- **Expected Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "6ab408...",
      "email": "student@example.com",
      "createdAt": "2026-09-23T17:11:15.892Z"
    }
  }
  ```

### Step 6: Test Input Validation Middleware (Missing Title)

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/tasks`
- **Headers:**
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <paste_your_token_here>`
- **Body (raw JSON):**
  ```json
  {
    "description": "Task without title",
    "priority": "high"
  }
  ```
- **Expected Response (400 Bad Request):**
  ```json
  {
    "success": false,
    "error": "Title is required and cannot be empty"
  }
  ```

---

## 5. Troubleshooting Guide

| Symptom                                | Likely Cause                                                 | Solution / Fix                                                                                                   |
| -------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `401 Unauthorized` on every request    | `Authorization` header missing or malformed                  | Set header exactly as `Authorization: Bearer <token>` with a single space between `Bearer` and the token string. |
| Server crashes on invalid token        | `jwt.verify()` threw uncaught exception                      | Wrap `jwt.verify()` in `try/catch` in `auth.js` and return a structured `401` response.                          |
| Login fails even with correct password | Comparing plain text using `===` instead of `bcrypt.compare` | Use `await bcrypt.compare(password, user.password)`.                                                             |
| `JWT_SECRET is undefined`              | `.env` not loaded or variable mismatch                       | Call `require('dotenv').config()` before referencing `process.env.JWT_SECRET` and verify key matches `.env`.     |
| Task title validation not firing       | Missing validation middleware in route pipeline              | Place `validateTaskInput` right before controller handler: `router.post('/', validateTaskInput, createTask);`.   |

---

## 6. How to Run the Project

### Prerequisites

- Node.js (v18+)
- MongoDB running locally (`mongodb://127.0.0.1:27017`)

### 1. Backend Setup & Automated Test Suite

```bash
cd backend
npm install
npm test       # Executes all 10 automated verification tests
npm run dev    # Starts API server on port 5000
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev    # Starts Vite dev server on port 5173
```

---

# Practical 8: Performance Optimization & Lazy Loading in React

**Course Outcomes (CO) & Program Outcomes (PO):** CO1 / PO3, PO5  
**Objective:** To improve frontend performance using lazy loading, route-based code splitting (`React.lazy()`, `Suspense`), and component memoization (`React.memo`, `useCallback`).

---

## 1. Architecture: Single Bundle vs. Code-Split Chunks

### Before Optimization (Monolithic Single Bundle)

All route components, heavy visualizers, modals, and business logic were statically bundled into one single JavaScript file downloaded upfront on initial load.

```
                              Initial HTTP Request (/)
                                         │
                                         ▼
                            dist/assets/index.bundle.js (158.81 kB)
             ┌───────────────────────────┼───────────────────────────┐
             ▼                           ▼                           ▼
        [Home View]               [Projects View]             [Contact View]
```

### After Optimization (Route-Based & Component-Based Code Splitting)

Initial page load only downloads the lightweight application shell. Each subsequent route and heavy component is downloaded asynchronously over HTTP only when the user requests it.

```
                              Initial HTTP Request (/)
                                         │
                                         ▼
                    dist/assets/index-[hash].js (Application Shell & Core Router)
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 │ (Asynchronous Dynamic import() On Route Change)│
                 ▼                                               ▼
       When navigating to /                            When navigating to /projects
                 │                                               │
                 ▼                                               ▼
      Home-[hash].js (4.02 kB)                       Projects-[hash].js (3.68 kB)
                 │                                               │
                 ▼                                               ▼
       When navigating to /analytics                   When navigating to /contact
                 │                                               │
                 ▼                                               ▼
    Analytics-[hash].js (2.86 kB)                    Contact-[hash].js (5.41 kB)
                 │
                 ▼ (Component-level Lazy Loading)
   HeavyTaskChart-[hash].js (2.38 kB)
```

---

## 2. Quantitative Performance Metrics: Before vs. After

Recorded directly from `npm run build` output via Vite v5.4:

| File / Chunk                           | Optimization Category             | Before Size (Pre-P8) | After Size (Post-P8) | Gzip Size  | Loading Trigger / Timing             |
| :------------------------------------- | :-------------------------------- | :------------------- | :------------------- | :--------- | :----------------------------------- |
| `index.html`                           | HTML Shell Entry                  | `0.41 kB`            | `0.41 kB`            | `0.28 kB`  | Immediate (First visit)              |
| `dist/assets/index.css`                | Stylesheet Bundle                 | `11.42 kB`           | `22.93 kB`           | `5.19 kB`  | Immediate                            |
| `dist/assets/index-[hash].js`          | App Shell & Core Runtime          | **`158.81 kB`**      | `198.12 kB`          | `64.54 kB` | Immediate                            |
| `dist/assets/Home-[hash].js`           | Lazy Route: Home Dashboard        | _bundled in index_   | **`4.02 kB`**        | `1.39 kB`  | When `/` is active                   |
| `dist/assets/Projects-[hash].js`       | Lazy Route: Projects Directory    | _bundled in index_   | **`3.68 kB`**        | `1.36 kB`  | Only when `/projects` is visited     |
| `dist/assets/Analytics-[hash].js`      | Lazy Route: Analytics Page        | _bundled in index_   | **`2.86 kB`**        | `1.00 kB`  | Only when `/analytics` is visited    |
| `dist/assets/HeavyTaskChart-[hash].js` | Heavy Component (Supplementary 1) | _bundled in index_   | **`2.38 kB`**        | `0.85 kB`  | Only when chart module is toggled on |
| `dist/assets/Contact-[hash].js`        | Lazy Route: Contact & FAQ         | _bundled in index_   | **`5.41 kB`**        | `1.87 kB`  | Only when `/contact` is visited      |

> **Key Observation:** Instead of downloading all page logic upfront, auxiliary routes are completely deferred. A user who only checks tasks on the Home route never downloads the 14.33 kB of code for Projects, Contact, Analytics, and Heavy Charts.

---

## 3. Step-by-Step Verification in Browser DevTools

### Step 1: Open the Network Panel

1. Start the frontend: `npm run dev` in `frontend/`
2. Open Google Chrome or Edge and visit `http://localhost:5173`
3. Press `F12` to open DevTools and select the **Network** tab.
4. Filter requests by clicking the **JS** (JavaScript) filter button.

### Step 2: Observe Initial Load

- Refresh the page at `/`.
- Observe that only `index.html`, `main.jsx`, `App.jsx`, and `Home.jsx` load.
- Notice that `Projects.jsx`, `Analytics.jsx`, `Contact.jsx`, and `HeavyTaskChart.jsx` are **NOT** present in the Network request list.

### Step 3: Trigger Dynamic Import

- Click on the **Projects** link in the top navigation bar.
- Instantly observe a new HTTP GET request in the Network log: `Projects.jsx` (or `Projects-[hash].js` in production).
- Click on **Contact** — observe `Contact.jsx` load.
- Click on **Analytics** — observe `Analytics.jsx` load.

### Step 4: Test Throttling to Observe the Fallback UI

1. In the DevTools Network tab, change the Throttling dropdown from **"No throttling"** to **"Slow 3G"**.
2. Click on a route you have not visited yet (or hard refresh with `Ctrl + F5`).
3. Observe the custom **`LoadingFallback`** component appear on screen:
   - Displays the animated blue spinner ring.
   - Shows the status: _"Loading page component chunk..."_ and _"Fetching JavaScript chunk via dynamic `import()`"_.
   - Displays the pulsating skeleton progress bar.
4. As soon as the chunk finish downloading, React Suspense seamlessly transitions from the fallback to the rendered page.

---

## 4. Solutions to Supplementary Problems

### Supplementary Problem 1: Lazy Load a Heavy Third-Party Component

- **Requirement:** Lazy load a heavy third-party component (e.g. chart library or analytics module) only when a specific page needs it.
- **Implementation:**
  - Created `src/components/HeavyTaskChart.jsx`, containing weekly velocity calculations and priority distribution visualization.
  - In `src/pages/Analytics.jsx`, dynamically imported the component via:
    ```javascript
    const HeavyTaskChart = lazy(
      () => import("../components/HeavyTaskChart.jsx"),
    );
    ```
  - Wrapped inside its own nested `<Suspense fallback={<LoadingFallback message="Loading Chart Component Chunk..." />}>`.
  - Added an interactive toggle button _"Load Heavy Chart Module"_ so the browser only requests `HeavyTaskChart-[hash].js` on user demand.

### Supplementary Problem 2: Minimum-Delay Fallback (Anti-Flicker)

- **Requirement:** Add a minimum-delay fallback (e.g., 300ms) to avoid a flickering loading state on fast connections.
- **Implementation in `src/components/LoadingFallback.jsx`:**
  - When a user has a high-speed fiber or local connection, a 20ms chunk download could cause a 1-frame flash of the spinner, jarring the user.
  - Implemented an internal threshold timer:
    ```javascript
    useEffect(() => {
      const timer = setTimeout(() => setShow(true), 150);
      return () => clearTimeout(timer);
    }, []);
    ```
  - If the chunk arrives within the threshold, no spinner flashes. If network latency exceeds the threshold, the rich loading state smoothly fades in.

### Supplementary Problem 3: React DevTools Profiler Analysis & Re-render Optimization

- **Requirement:** Use the React DevTools Profiler to identify and document one unnecessary re-render in the app.
- **Diagnosis:**
  - In the baseline app, editing a single task or toggling a toast notification caused the parent `App` component to re-render.
  - Because `TaskForm`, `TaskList`, and every `TaskItem` were regular functional components, React recursively re-rendered all 20+ list items even though their individual props (`task.title`, `task.completed`, `task.priority`) had not changed.
- **Solution Applied:**
  1. Wrapped `TaskItem.jsx` in `React.memo(TaskItem)` with shallow prop comparison.
  2. Wrapped `TaskForm.jsx` in `React.memo(TaskForm)`.
  3. Wrapped `TaskList.jsx` in `React.memo(TaskList)`.
  4. Wrapped all action handlers in `App.jsx` (`handleCreate`, `handleToggleComplete`, `handleUpdatePriority`, `handleRequestDelete`, `handleConfirmDelete`) inside `useCallback()` to preserve stable function references across re-renders.
- **Result:**
  - Checking a single task item now triggers a render **only** for that single `TaskItem` component. All other `TaskItem` instances are flagged as _"Did not render (props did not change)"_ in the Profiler flamegraph.

---

## 5. Conceptual Analysis & Viva Q&A

### Q1: What is the difference between the initial bundle and a lazy-loaded chunk?

- **Initial Bundle (`main` / `index`):** Downloaded and executed synchronously when the user first opens the URL. It contains the foundational runtime (React core, ReactDOM, router, layout, global CSS, state management).
- **Lazy-Loaded Chunk:** Stored as an isolated `.js` file on the web server. It is fetched asynchronously via dynamic HTTP GET requests (`import()`) triggered only when specific conditions are met (e.g., matching a route or toggling a heavy UI module).

### Q2: Why does lazy loading improve perceived performance if total code downloaded eventually stays the same?

- **Reduces Time to Interactive (TTI) and First Contentful Paint (FCP):** The browser is single-threaded. Downloading, parsing, and compiling a large 1MB JavaScript bundle blocks the main thread for hundreds of milliseconds.
- By splitting into small 5–10 kB chunks, the browser only parses the code needed for the immediate viewport, rendering the interactive UI almost instantaneously.
- Many users only ever visit one or two pages during a session; auxiliary pages (like Settings, Contact, or Admin) may never need to be downloaded at all.

### Q3: In what situations would lazy loading NOT be worth the added complexity?

1. **Very Small Applications:** If the entire bundled application is under ~50–80 kB, the HTTP request overhead (TCP handshake, TLS negotiation, round-trip time) of fetching multiple separate chunks is slower than downloading a single compressed file.
2. **Critical Above-the-Fold Components:** Essential components needed for the primary user experience (e.g. Navigation Header, Hero section) should never be lazy loaded because the Suspense fallback causes layout shift and delays initial rendering.
3. **Flaky / Offline-First Scenarios:** If a user loses internet connectivity after loading the initial page, navigating to a lazy-loaded route will throw an unhandled chunk loading error unless offline service worker caching is implemented.

---

## 6. Practical 8 Troubleshooting Guide

| Symptom                                                                          | Likely Cause                                                 | Solution / Fix                                                                                                                       |
| :------------------------------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `Element type is invalid: expected a string or a class/function but got: object` | Lazy-loaded component lacks a default export                 | Ensure the target file terminates with `export default ComponentName;` (named exports are not supported by standard `React.lazy`).   |
| Fallback UI never appears during navigation                                      | Network is too fast (localhost / high-speed Wi-Fi)           | In DevTools Network tab, enable **Slow 3G** or **Fast 3G** throttling to simulate mobile network latency.                            |
| No separate chunk files generated in `dist/assets/`                              | Static import statement still present at the top of the file | Remove `import Projects from './pages/Projects'` and replace with `const Projects = lazy(() => import('./pages/Projects'))`.         |
| Suspense fallback shows for the entire application                               | Suspense wraps too broad a component tree                    | Move `<Suspense>` so that it directly encloses `<Routes>` inside `<main>`, keeping `<Navbar>` outside so the header remains visible. |
