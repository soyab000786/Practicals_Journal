const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'students.json');

const getStudentsData = () => {
  try {
    const raw = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
};

const saveStudentsData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

/**
 * @desc   Get All Students with search, filtering, sorting, pagination
 * @route  GET /api/students
 */
const getAllStudents = (req, res) => {
  let students = getStudentsData();
  const { department, semester, minCgpa, search, sortBy } = req.query;

  // Filter by department
  if (department) {
    students = students.filter(s => s.department.toLowerCase() === department.toLowerCase());
  }

  // Filter by semester
  if (semester) {
    students = students.filter(s => s.semester === parseInt(semester));
  }

  // Filter by minimum CGPA
  if (minCgpa) {
    students = students.filter(s => s.cgpa >= parseFloat(minCgpa));
  }

  // Search by keyword (name, rollNo, email)
  if (search) {
    const q = search.toLowerCase();
    students = students.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.rollNo.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q)
    );
  }

  // Sort by cgpa or name
  if (sortBy === 'cgpa_desc') {
    students.sort((a, b) => b.cgpa - a.cgpa);
  } else if (sortBy === 'name') {
    students.sort((a, b) => a.name.localeCompare(b.name));
  }

  res.status(200).json({
    success: true,
    totalRecords: students.length,
    data: students
  });
};

/**
 * @desc   Get Student By ID or Roll Number
 * @route  GET /api/students/:id
 */
const getStudentById = (req, res) => {
  const students = getStudentsData();
  const param = req.params.id;

  const student = students.find(s => s.id.toString() === param || s.rollNo.toLowerCase() === param.toLowerCase());

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID or Roll No "${param}" was not found.`
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
};

/**
 * @desc   Create New Student Record
 * @route  POST /api/students
 */
const createStudent = (req, res) => {
  const students = getStudentsData();
  const { rollNo, name, email, phone, department, semester, cgpa } = req.body;

  // Check unique rollNo
  const existingRoll = students.find(s => s.rollNo.toLowerCase() === rollNo.trim().toLowerCase());
  if (existingRoll) {
    return res.status(409).json({
      success: false,
      message: `Student with Roll Number "${rollNo}" already exists in records.`
    });
  }

  // Check unique email
  const existingEmail = students.find(s => s.email.toLowerCase() === email.trim().toLowerCase());
  if (existingEmail) {
    return res.status(409).json({
      success: false,
      message: `Student with Email "${email}" is already registered.`
    });
  }

  const nextId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;

  const newStudent = {
    id: nextId,
    rollNo: rollNo.trim().toUpperCase(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? phone.trim() : 'N/A',
    department: department.trim(),
    semester: parseInt(semester),
    cgpa: cgpa !== undefined ? parseFloat(cgpa) : 0.0,
    enrolledDate: new Date().toISOString().split('T')[0]
  };

  students.push(newStudent);
  saveStudentsData(students);

  res.status(201).json({
    success: true,
    message: 'Student record created successfully.',
    data: newStudent
  });
};

/**
 * @desc   Update Student Record
 * @route  PUT /api/students/:id
 */
const updateStudent = (req, res) => {
  const students = getStudentsData();
  const param = req.params.id;
  const index = students.findIndex(s => s.id.toString() === param || s.rollNo.toLowerCase() === param.toLowerCase());

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student record "${param}" not found for update.`
    });
  }

  const { name, email, phone, department, semester, cgpa } = req.body;

  students[index] = {
    ...students[index],
    name: name !== undefined ? name.trim() : students[index].name,
    email: email !== undefined ? email.trim().toLowerCase() : students[index].email,
    phone: phone !== undefined ? phone.trim() : students[index].phone,
    department: department !== undefined ? department.trim() : students[index].department,
    semester: semester !== undefined ? parseInt(semester) : students[index].semester,
    cgpa: cgpa !== undefined ? parseFloat(cgpa) : students[index].cgpa,
    updatedAt: new Date().toISOString()
  };

  saveStudentsData(students);

  res.status(200).json({
    success: true,
    message: 'Student record updated successfully.',
    data: students[index]
  });
};

/**
 * @desc   Delete Student Record
 * @route  DELETE /api/students/:id
 */
const deleteStudent = (req, res) => {
  const students = getStudentsData();
  const param = req.params.id;
  const student = students.find(s => s.id.toString() === param || s.rollNo.toLowerCase() === param.toLowerCase());

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student record "${param}" not found for deletion.`
    });
  }

  const filtered = students.filter(s => s.id !== student.id);
  saveStudentsData(filtered);

  res.status(200).json({
    success: true,
    message: `Student record for "${student.name}" (Roll: ${student.rollNo}) deleted successfully.`,
    data: student
  });
};

/**
 * @desc   Get Department-wise summary & statistics
 * @route  GET /api/students/stats/overview
 */
const getStudentStats = (req, res) => {
  const students = getStudentsData();

  const total = students.length;
  const deptCounts = {};
  let totalCgpa = 0;

  students.forEach(s => {
    deptCounts[s.department] = (deptCounts[s.department] || 0) + 1;
    totalCgpa += s.cgpa || 0;
  });

  const avgCgpa = total > 0 ? (totalCgpa / total).toFixed(2) : 0;

  res.status(200).json({
    success: true,
    statistics: {
      totalStudents: total,
      averageCgpa: parseFloat(avgCgpa),
      departmentDistribution: deptCounts
    }
  });
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentStats
};
