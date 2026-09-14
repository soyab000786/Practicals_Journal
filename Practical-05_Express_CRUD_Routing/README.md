# Practical 05: Express.js Server, Routing & CRUD Operations

## 🎯 Practical Aim / Objective
> **Practical Title:** Create a backend server using Express.js implementing routing and CRUD operation.

---

## 📖 Theory & Core Concepts

### 1. What is Express.js?
**Express.js** is a fast, unopinionated, minimalist web framework for Node.js. It simplifies building robust server-side web applications and REST APIs by providing features like routing, middleware processing, and HTTP utility methods.

### 2. Express Routing
Routing refers to determining how an application responds to a client request to a particular endpoint (URI path) and HTTP request method (`GET`, `POST`, `PUT`, `DELETE`).

```javascript
const express = require('express');
const router = express.Router();

router.get('/products', getAllProducts);
router.post('/products', createProduct);
```

### 3. Middleware Pipeline
Middleware functions have access to the Request object (`req`), the Response object (`res`), and the `next` function in the application’s request-response cycle.
- `express.json()`: Parses incoming JSON payload.
- `cors()`: Enables cross-origin resource sharing.
- `requestLogger`: Custom middleware that measures latency and logs status codes.
- `errorHandler`: Global error trap for unhandled exceptions.

---

## 📡 API Endpoints & CRUD Operations

| Method | Endpoint | Description | Status Code |
|:---|:---|:---|:---:|
| `GET` | `/` | API Information & Health Check | 200 OK |
| `GET` | `/api/products` | Retrieve all products (Supports `?category=`, `?search=`, `?minPrice=`) | 200 OK |
| `GET` | `/api/products/:id` | Retrieve single product by numeric ID | 200 OK / 404 |
| `POST` | `/api/products` | Create a new product | 201 Created / 400 |
| `PUT` | `/api/products/:id` | Update product by ID | 200 OK / 404 |
| `DELETE` | `/api/products/:id` | Delete product by ID | 200 OK / 404 |

---

## 📂 Project Structure
```
Practical-05_Express_CRUD_Routing/
├── package.json
├── server.js                   # Application entry point & middleware mounting
├── test-requests.http          # REST Client request suite
├── README.md
├── routes/
│   └── productRoutes.js        # Modular route definitions
├── controllers/
│   └── productController.js    # CRUD business logic handlers
├── middleware/
│   ├── logger.js               # Terminal request logger
│   └── errorHandler.js         # Centralized error handler
└── data/
    └── products.json           # File-persisted product dataset
```

---

## 🚀 How to Run

1. Open terminal inside this directory:
   ```bash
   cd Practical-05_Express_CRUD_Routing
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   *(Or for auto-reload: `npm run dev`)*
4. Server starts on: `http://localhost:5000`

---

## 🧪 Testing with cURL / REST Client

### Get All Products:
```bash
curl -X GET http://localhost:5000/api/products
```

### Add a Product (POST):
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Wireless Mouse\",\"category\":\"Electronics\",\"price\":1499,\"stock\":20}"
```
