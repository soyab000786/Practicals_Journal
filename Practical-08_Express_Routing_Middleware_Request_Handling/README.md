# Practical 08: Express.js Routing, Middleware & Request Handling

## 🎯 Practical Objective
Create a backend server using **Express.js** implementing modular routing, custom middleware pipelines (logging, auth, rate limiting, payload validation), and comprehensive request handling (URL parameters, query strings, headers, and request body).

---

## 🛠️ Architecture & Concepts
- **Custom Middleware**:
  - `logger.js`: Logs method, path, IP, status code, and execution time in ms.
  - `auth.js`: Header inspection (`x-api-key`) for protected routes.
  - `rateLimiter.js`: Sliding window request throttler per IP.
  - `validator.js`: Regex email validation, string sanitization, and role checking.
- **Request Handling**:
  - `req.query`: Query strings for filtering (`?role=admin&active=true&search=soyab`) and sorting (`?sortBy=price&order=desc`).
  - `req.params`: URL params for resource retrieval (`/api/users/:id`).
  - `req.headers`: Header extraction (`X-API-KEY`).
  - `req.body`: POST JSON body creation with full validation.
- **Centralized Error Pipeline**: Error-first middleware `(err, req, res, next)`.

---

## 🚀 How to Run Locally

### Option 1: Live Node.js Server
```bash
cd Practical-08_Express_Routing_Middleware_Request_Handling
npm install
node server.js
```
Open [http://localhost:5000](http://localhost:5000) or test endpoints in Postman.

### Option 2: Apache XAMPP
Open [http://localhost/Practicals_Journal/Practical-08_Express_Routing_Middleware_Request_Handling/](http://localhost/Practicals_Journal/Practical-08_Express_Routing_Middleware_Request_Handling/) in any browser.
