const mongoose = require('mongoose');

const fileMetadataSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: [true, 'Original file name is required'],
    trim: true
  },
  storedFileName: {
    type: String,
    required: true,
    unique: true
  },
  mimeType: {
    type: String,
    required: true
  },
  sizeBytes: {
    type: Number,
    required: true
  },
  sizeFormatted: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Document', 'Image', 'Archive', 'Other'],
    default: 'Document'
  },
  description: {
    type: String,
    default: 'Uploaded document file'
  },
  uploadedBy: {
    type: String,
    default: 'Saiyad Soyab'
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FileMetadata', fileMetadataSchema);
