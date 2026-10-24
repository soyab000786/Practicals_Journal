const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'mern_rbac_secret_key_2026';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Sample Posts
let posts = [
  { id: 1, title: 'Getting Started with Full Stack MERN Architecture', content: 'Explore how React, Express, and MongoDB combine to create high performance web applications.', category: 'Engineering', authorName: 'Saiyad Soyab (Admin)', authorRole: 'Admin' },
  { id: 2, title: 'Understanding Role-Based Access Control (RBAC)', content: 'Protecting your REST APIs with JWT authentication tokens and granular role permissions.', category: 'Security', authorName: 'Aditya Sharma', authorRole: 'Author' }
];

// Authentication Login Route
app.post('/api/auth/login', (req, res) => {
  const { role = 'Author', username = 'Soyab Saiyad' } = req.body;
  const token = jwt.sign({ username, role }, JWT_SECRET, { expiresIn: '2h' });

  res.status(200).json({
    success: true,
    message: `Logged in as ${role}`,
    token,
    user: { username, role }
  });
});

// GET /api/posts - Public: Any Reader can view
app.get('/api/posts', (req, res) => {
  res.status(200).json({ success: true, count: posts.length, data: posts });
});

// POST /api/posts - RBAC: Only Admin or Author can create
app.post('/api/posts', (req, res) => {
  const { title, content, category, authorName, authorRole } = req.body;
  if (authorRole === 'Reader') {
    return res.status(403).json({ success: false, message: 'Forbidden: Readers cannot create posts.' });
  }

  const newPost = { id: Date.now(), title, content, category, authorName, authorRole };
  posts.unshift(newPost);
  res.status(201).json({ success: true, message: 'Post published successfully!', data: newPost });
});

// DELETE /api/posts/:id - RBAC: Only Admin can delete any post
app.delete('/api/posts/:id', (req, res) => {
  const userRole = req.headers['x-user-role'];
  if (userRole !== 'Admin') {
    return res.status(403).json({ success: false, message: 'Forbidden: Only Admin role can delete blog posts.' });
  }
  posts = posts.filter(p => p.id !== Number(req.params.id));
  res.status(200).json({ success: true, message: 'Post deleted by Admin.' });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` Practical 11: MERN Blog Management & RBAC Server`);
  console.log(` Server URL: http://localhost:${PORT}`);
  console.log(` Student: Saiyad Soyab | Enrollment: 26084231040`);
  console.log(`=======================================================`);
});

module.exports = app;
