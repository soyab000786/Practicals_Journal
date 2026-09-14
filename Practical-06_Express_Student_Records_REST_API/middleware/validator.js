/**
 * Validation Middleware for Student Record Creation and Update
 */
const validateStudentPayload = (req, res, next) => {
  const { rollNo, name, email, department, semester, cgpa } = req.body;
  const errors = [];

  // Required fields for POST
  if (req.method === 'POST') {
    if (!rollNo || !rollNo.toString().trim()) errors.push('Field "rollNo" is required.');
    if (!name || !name.trim()) errors.push('Field "name" is required.');
    if (!email || !email.trim()) errors.push('Field "email" is required.');
    if (!department || !department.trim()) errors.push('Field "department" is required.');
    if (semester === undefined) errors.push('Field "semester" is required.');
  }

  // Email format check if provided
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push('Field "email" must be a valid email format.');
    }
  }

  // Semester range check if provided
  if (semester !== undefined) {
    const semNum = parseInt(semester);
    if (isNaN(semNum) || semNum < 1 || semNum > 8) {
      errors.push('Field "semester" must be an integer between 1 and 8.');
    }
  }

  // CGPA range check if provided
  if (cgpa !== undefined) {
    const cgpaNum = parseFloat(cgpa);
    if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
      errors.push('Field "cgpa" must be a float between 0.00 and 10.00.');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed on student record payload.',
      errors
    });
  }

  next();
};

module.exports = { validateStudentPayload };
