const express = require('express');
const router = express.Router();
const validateUserPayload = require('../middleware/validator');

// Mock User Database
let users = [
  { id: 1, name: 'Saiyad Soyab', email: 'soyab@gnu.ac.in', role: 'admin', active: true },
  { id: 2, name: 'Rahul Sharma', email: 'rahul.s@gnu.ac.in', role: 'developer', active: true },
  { id: 3, name: 'Ananya Verma', email: 'ananya.v@gnu.ac.in', role: 'student', active: false }
];

// GET /api/users - Query parameters handling (filtering, searching)
router.get('/', (req, res) => {
  const { role, active, search } = req.query;
  let results = [...users];

  if (role) {
    results = results.filter(u => u.role.toLowerCase() === role.toLowerCase());
  }

  if (active !== undefined) {
    const isActive = active === 'true';
    results = results.filter(u => u.active === isActive);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }

  res.status(200).json({
    success: true,
    count: results.length,
    queryApplied: req.query,
    data: results
  });
});

// GET /api/users/:id - URL Parameter handling with validation
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (isNaN(userId)) {
    return res.status(400).json({ success: false, error: 'Invalid ID: must be a number' });
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ success: false, error: `User with ID ${userId} not found` });
  }

  res.status(200).json({ success: true, data: user });
});

// POST /api/users - Request Body handling with middleware validation
router.post('/', validateUserPayload, (req, res) => {
  const { name, email, role, active } = req.body;
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: role ? role.toLowerCase() : 'student',
    active: active !== undefined ? Boolean(active) : true
  };

  users.push(newUser);
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser
  });
});

// GET /api/users/secure/data - Protected endpoint requiring API key header
router.get('/secure/data', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Authenticated successfully via X-API-KEY header!',
    secretReport: {
      serverStatus: 'Operational',
      uptime: process.uptime(),
      adminContact: 'admin@gnu.ac.in',
      authorizedUser: 'Saiyad Soyab (26084231040)'
    }
  });
});

module.exports = router;
