const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  department: {
    type: String,
    enum: ['Engineering', 'Finance', 'Legal', 'HR', 'Academic'],
    required: true
  },
  accessLevel: {
    type: String,
    enum: ['Public', 'Internal', 'Confidential'],
    default: 'Internal'
  },
  version: { type: String, default: 'v1.0' },
  fileSize: { type: String, required: true },
  fileType: { type: String, required: true },
  author: { type: String, required: true },
  tags: [{ type: String }],
  downloadCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', documentSchema);
