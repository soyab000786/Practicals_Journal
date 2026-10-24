# Practical 11: Blog Management System with Authentication & RBAC

## 🎯 Practical Objective
Create a complete **Blog Management System** implementing:
- **JWT (JSON Web Token) Authentication** & password hashing with bcrypt.
- **Role-Based Access Control (RBAC)** across three distinct privilege levels:
  - **Admin**: Full system control (publish, edit, and delete any blog post).
  - **Author**: Publish articles and manage own posts.
  - **Reader**: View published articles and post comments.

---

## 🚀 How to Run Locally
```bash
cd Practical-11_MERN_Blog_Auth_RBAC
npm install
node server.js
```
Open [http://localhost:5000](http://localhost:5000) or test via Apache [http://localhost/Practicals_Journal/Practical-11_MERN_Blog_Auth_RBAC/](http://localhost/Practicals_Journal/Practical-11_MERN_Blog_Auth_RBAC/).
