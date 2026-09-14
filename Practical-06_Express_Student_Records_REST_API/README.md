# Practical 06: Student Records RESTful API with Postman Testing

## 🎯 Practical Aim / Objective
> **Practical Title:** Build RESTful APIs for Student Records Management using Express.js and Postman testing.

---

## 📖 Theory & REST Principles

### 1. RESTful API Architecture
**REST (Representational State Transfer)** is an architectural style for distributed hypermedia systems. Key constraints include:
- **Statelessness:** Each request from client to server must contain all necessary information.
- **Client-Server Separation:** Independent evolution of UI and data store.
- **Uniform Interface:** Standard HTTP Verbs (`GET`, `POST`, `PUT`, `DELETE`) and resource URIs (`/api/students`).
- **Standard HTTP Status Codes:**
  - `200 OK`: Successful retrieval or update.
  - `201 Created`: Successful resource creation.
  - `400 Bad Request`: Payload validation failed.
  - `404 Not Found`: Resource does not exist.
  - `409 Conflict`: Duplicate unique key (e.g., Roll number or Email already exists).

---

## 📮 Postman Testing Suite & Endpoints

A complete Postman Collection file `Student_Records_API.postman_collection.json` is provided in this folder.

| S.No | Request Name | HTTP Method | Endpoint URI | Expected Status |
|:---:|:---|:---:|:---|:---:|
| 1 | Server Health Check | `GET` | `http://localhost:5000/` | `200 OK` |
| 2 | Get All Students | `GET` | `http://localhost:5000/api/students` | `200 OK` |
| 3 | Filter by Department | `GET` | `http://localhost:5000/api/students?department=Computer Engineering` | `200 OK` |
| 4 | Search by Keyword | `GET` | `http://localhost:5000/api/students?search=Soyab` | `200 OK` |
| 5 | Get Student by ID | `GET` | `http://localhost:5000/api/students/1` | `200 OK` |
| 6 | Get Student by Roll No | `GET` | `http://localhost:5000/api/students/21CS001` | `200 OK` |
| 7 | Create New Student | `POST` | `http://localhost:5000/api/students` | `201 Created` |
| 8 | Validation Error Check | `POST` | `http://localhost:5000/api/students` | `400 Bad Request` |
| 9 | Update Student Record | `PUT` | `http://localhost:5000/api/students/1` | `200 OK` |
| 10 | Department Analytics | `GET` | `http://localhost:5000/api/students/stats/overview` | `200 OK` |
| 11 | Delete Student Record | `DELETE` | `http://localhost:5000/api/students/21CS099` | `200 OK` |

---

## 🚀 How to Import into Postman & Test

1. Start the API Server:
   ```bash
   cd Practical-06_Express_Student_Records_REST_API
   npm install
   npm start
   ```
2. Open **Postman Desktop Application**.
3. Click the **Import** button in the top-left corner.
4. Drag & drop `Student_Records_API.postman_collection.json` into Postman.
5. Click **Run Collection** or execute individual requests to test API responses.

---

## 📂 Project Structure
```
Practical-06_Express_Student_Records_REST_API/
├── package.json
├── server.js                                      # Express API entry point
├── Student_Records_API.postman_collection.json    # Complete Postman Collection
├── README.md
├── routes/
│   └── studentRoutes.js                           # RESTful route definitions
├── controllers/
│   └── studentController.js                       # Logic with search, filter & stats
├── middleware/
│   ├── validator.js                               # Input validation middleware
│   └── logger.js                                  # HTTP logger
└── data/
    └── students.json                              # JSON Student records dataset
```
