# Practical 07: Employee Management API with MongoDB Atlas

## 🎯 Practical Aim / Objective
> **Practical Title:** Develop an Employee Management API integrating Express.js with MongoDB Atlas.

---

## 📖 Theory & Architecture

### 1. MongoDB Atlas & Mongoose ODM
- **MongoDB Atlas** is a fully-managed cloud database service hosted on AWS/GCP/Azure.
- **Mongoose** is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and translates between objects in code and their representation in MongoDB.

### 2. Mongoose Schema Design
In this practical, the `Employee` schema enforces data types, constraints, and business logic:
- `empId`: Unique, uppercase, trimmed alphanumeric identifier.
- `firstName`, `lastName`: Required string attributes with min length.
- `email`: Enforces regex email format and global uniqueness.
- `department`: Enum validation constrained to company divisions (`Engineering`, `Human Resources`, `Finance`, `Marketing`, `Product`, `Operations`).
- `salary`: Numeric constraint (`min: 0`).
- `status`: Enum values (`Active`, `Inactive`, `On Leave`).

### 3. MongoDB Aggregation Pipeline
The API includes an analytics endpoint (`GET /api/employees/stats/summary`) that executes MongoDB aggregate functions (`$group`, `$sum`, `$avg`, `$min`, `$max`) to compute departmental headcounts and salary distributions in a single high-performance query.

---

## 🌐 MongoDB Atlas Setup Guide

To connect your own MongoDB Atlas Cloud Cluster:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free tier cluster.
2. Under **Security > Database Access**, create a database user (e.g. `admin`) and set a password.
3. Under **Security > Network Access**, click **Add IP Address** and choose **Allow Access From Anywhere (`0.0.0.0/0`)**.
4. In **Database > Connect**, select **Drivers (Node.js)** and copy your connection string.
5. In this project folder, open `.env` and set:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/employee_db?retryWrites=true&w=majority
   ```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Query Parameters |
|:---|:---|:---|:---|
| `GET` | `/` | API Status & Available Routes | - |
| `GET` | `/api/employees` | List employees with pagination & filters | `?page=1&limit=10&department=Engineering&search=Soyab` |
| `GET` | `/api/employees/:id` | Get single employee by MongoDB `_id` or `empId` | - |
| `POST` | `/api/employees` | Create a new employee record | - |
| `PUT` | `/api/employees/:id` | Update employee information | - |
| `DELETE` | `/api/employees/:id` | Delete employee record | - |
| `GET` | `/api/employees/stats/summary` | Department salary & headcount aggregation | - |

---

## 🚀 How to Run

1. Open a terminal in this directory:
   ```bash
   cd Practical-07_Express_MongoDB_Employee_Management
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Populate database with sample records:
   ```bash
   npm run seed
   ```
4. Start the server:
   ```bash
   npm start
   ```
   *(Or for live reload: `npm run dev`)*
5. Server starts at `http://localhost:5000`. Test endpoints using `test-requests.http` or Postman.
