const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const upload = require('../config/multer');
const FileMetadata = require('../models/FileMetadata');

// Helper to format bytes
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// In-Memory fallback store if MongoDB is offline
let localFiles = [];

// POST /api/files/upload - Single File Upload
router.post('/upload', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select a file to upload.' });
    }

    const { description, category } = req.body;
    const fileData = {
      originalName: req.file.originalname,
      storedFileName: req.file.filename,
      mimeType: req.file.mimetype,
      sizeBytes: req.file.size,
      sizeFormatted: formatBytes(req.file.size),
      filePath: req.file.path,
      category: category || (req.file.mimetype.startsWith('image/') ? 'Image' : 'Document'),
      description: description || 'Uploaded via Web Portal',
      uploadedBy: 'Saiyad Soyab (26084231040)',
      uploadedAt: new Date()
    };

    let savedRecord;
    try {
      const record = new FileMetadata(fileData);
      savedRecord = await record.save();
    } catch (dbErr) {
      // Memory fallback if MongoDB Atlas connection is absent
      savedRecord = { _id: Date.now().toString(), ...fileData };
      localFiles.unshift(savedRecord);
    }

    res.status(201).json({
      success: true,
      message: 'File uploaded and metadata stored in MongoDB successfully!',
      data: savedRecord
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/files - Get All Uploaded File Metadata Records
router.get('/', async (req, res, next) => {
  try {
    let records = [];
    try {
      records = await FileMetadata.find().sort({ uploadedAt: -1 });
    } catch (dbErr) {
      records = localFiles;
    }

    res.status(200).json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/files/:id/download - Download file from disk
router.get('/:id/download', async (req, res, next) => {
  try {
    let fileRecord;
    try {
      fileRecord = await FileMetadata.findById(req.params.id);
    } catch {
      fileRecord = localFiles.find(f => f._id === req.params.id);
    }

    if (!fileRecord) {
      return res.status(404).json({ success: false, message: 'File record not found' });
    }

    const absolutePath = path.resolve(fileRecord.filePath);
    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ success: false, message: 'Physical file missing from server disk' });
    }

    res.download(absolutePath, fileRecord.originalName);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/files/:id - Delete File from Disk & MongoDB Record
router.delete('/:id', async (req, res, next) => {
  try {
    let fileRecord;
    try {
      fileRecord = await FileMetadata.findByIdAndDelete(req.params.id);
    } catch {
      const idx = localFiles.findIndex(f => f._id === req.params.id);
      if (idx !== -1) {
        fileRecord = localFiles.splice(idx, 1)[0];
      }
    }

    if (!fileRecord) {
      return res.status(404).json({ success: false, message: 'File record not found' });
    }

    // Remove physical file from disk
    if (fs.existsSync(fileRecord.filePath)) {
      fs.unlinkSync(fileRecord.filePath);
    }

    res.status(200).json({
      success: true,
      message: 'File and metadata deleted successfully'
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
