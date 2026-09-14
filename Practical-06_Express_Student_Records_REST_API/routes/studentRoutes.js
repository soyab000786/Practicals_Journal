const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentStats
} = require('../controllers/studentController');
const { validateStudentPayload } = require('../middleware/validator');

// Analytics / Stats endpoint (placed before :id route)
router.get('/stats/overview', getStudentStats);

// Main Student REST endpoints
router.route('/')
  .get(getAllStudents)
  .post(validateStudentPayload, createStudent);

router.route('/:id')
  .get(getStudentById)
  .put(validateStudentPayload, updateStudent)
  .delete(deleteStudent);

module.exports = router;
