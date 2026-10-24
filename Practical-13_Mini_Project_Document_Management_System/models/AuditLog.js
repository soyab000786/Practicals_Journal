const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  documentTitle: { type: String, required: true },
  performedBy: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  ipAddress: { type: String, default: '127.0.0.1' }
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
