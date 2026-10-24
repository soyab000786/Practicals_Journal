const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern_dms_db';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

mongoose.connect(MONGODB_URI)
  .then(() => console.log('DocuVault DMS connected to MongoDB database.'))
  .catch(err => console.log('DMS MongoDB connection notice (In-memory fallback active):', err.message));

// Seed Documents
let documents = [
  { id: '1', title: 'Ganpat University MERN Curriculum Specification', department: 'Academic', accessLevel: 'Internal', version: 'v2.1', fileSize: '2.4 MB', fileType: 'PDF', author: 'Saiyad Soyab (Admin)', downloadCount: 42, tags: ['Curriculum', 'MSc IT'] },
  { id: '2', title: 'Cloud Infrastructure & Architecture Blueprint', department: 'Engineering', accessLevel: 'Confidential', version: 'v1.0', fileSize: '5.1 MB', fileType: 'DOCX', author: 'DevOps Lead', downloadCount: 19, tags: ['Architecture', 'AWS'] },
  { id: '3', title: 'Q3 Enterprise Financial Audit Report', department: 'Finance', accessLevel: 'Confidential', version: 'v3.0', fileSize: '1.8 MB', fileType: 'PDF', author: 'Finance Director', downloadCount: 15, tags: ['Audit', 'Q3'] },
  { id: '4', title: 'Student Portal Security & Privacy Policy', department: 'Legal', accessLevel: 'Public', version: 'v1.2', fileSize: '650 KB', fileType: 'PDF', author: 'Legal Counsel', downloadCount: 88, tags: ['Policy', 'Security'] }
];

let auditLogs = [
  { action: 'CREATE', documentTitle: 'Ganpat University MERN Curriculum Specification', performedBy: 'Saiyad Soyab (26084231040)', time: 'Just now' },
  { action: 'ACCESS', documentTitle: 'Student Portal Security & Privacy Policy', performedBy: 'Guest User', time: '5m ago' }
];

// GET /api/documents - List with search and filter
app.get('/api/documents', (req, res) => {
  const { dept, access, search } = req.query;
  let result = [...documents];

  if (dept) result = result.filter(d => d.department.toLowerCase() === dept.toLowerCase());
  if (access) result = result.filter(d => d.accessLevel.toLowerCase() === access.toLowerCase());
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(d => d.title.toLowerCase().includes(q) || d.tags.some(t => t.toLowerCase().includes(q)));
  }

  res.status(200).json({
    success: true,
    count: result.length,
    stats: {
      totalDocs: documents.length,
      totalDownloads: documents.reduce((a, d) => a + d.downloadCount, 0),
      confidentialCount: documents.filter(d => d.accessLevel === 'Confidential').length
    },
    data: result
  });
});

// POST /api/documents - Create new document
app.post('/api/documents', (req, res) => {
  const { title, department, accessLevel, fileType, author, tags } = req.body;
  const newDoc = {
    id: Date.now().toString(),
    title,
    department,
    accessLevel: accessLevel || 'Internal',
    version: 'v1.0',
    fileSize: '1.2 MB',
    fileType: fileType || 'PDF',
    author: author || 'Saiyad Soyab',
    downloadCount: 0,
    tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : [])
  };

  documents.unshift(newDoc);
  auditLogs.unshift({ action: 'CREATE', documentTitle: title, performedBy: newDoc.author, time: 'Just now' });

  res.status(201).json({ success: true, message: 'Document archived in DocuVault', data: newDoc });
});

// DELETE /api/documents/:id - Delete document
app.delete('/api/documents/:id', (req, res) => {
  const doc = documents.find(d => d.id === req.params.id);
  if (doc) {
    auditLogs.unshift({ action: 'DELETE', documentTitle: doc.title, performedBy: 'Saiyad Soyab (Admin)', time: 'Just now' });
    documents = documents.filter(d => d.id !== req.params.id);
  }
  res.status(200).json({ success: true, message: 'Document purged from repository' });
});

// GET /api/audit - Get audit log history
app.get('/api/audit', (req, res) => {
  res.status(200).json({ success: true, data: auditLogs.slice(0, 15) });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` Practical 13: Mini Project - Document Management System`);
  console.log(` Server URL: http://localhost:${PORT}`);
  console.log(` Student: Saiyad Soyab | Enrollment: 26084231040`);
  console.log(`=======================================================`);
});

module.exports = app;
