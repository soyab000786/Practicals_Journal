const Employee = require('../models/Employee');

/**
 * @desc   Get All Employees with filtering, search, sorting & pagination
 * @route  GET /api/employees
 */
const getAllEmployees = async (req, res) => {
  try {
    const { department, status, search, minSalary, maxSalary, sortBy, page = 1, limit = 10 } = req.query;

    const query = {};

    // Filter by department
    if (department) {
      query.department = department;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by salary range
    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query.salary.$gte = Number(minSalary);
      if (maxSalary) query.salary.$lte = Number(maxSalary);
    }

    // Search keyword across firstName, lastName, email, designation
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } },
        { empId: { $regex: search, $options: 'i' } }
      ];
    }

    // Sorting
    let sortOption = { createdAt: -1 };
    if (sortBy === 'salary_desc') sortOption = { salary: -1 };
    else if (sortBy === 'salary_asc') sortOption = { salary: 1 };
    else if (sortBy === 'name') sortOption = { firstName: 1 };

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    const totalRecords = await Employee.countDocuments(query);
    const employees = await Employee.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: employees.length,
      totalRecords,
      totalPages: Math.ceil(totalRecords / Number(limit)),
      currentPage: Number(page),
      data: employees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve employees.',
      error: error.message
    });
  }
};

/**
 * @desc   Get Single Employee by MongoDB _id OR custom empId
 * @route  GET /api/employees/:id
 */
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Search by ObjectId or custom empId (e.g., EMP101)
    let employee;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      employee = await Employee.findById(id);
    } else {
      employee = await Employee.findOne({ empId: id.toUpperCase() });
    }

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: `Employee "${id}" was not found.`
      });
    }

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching employee details.',
      error: error.message
    });
  }
};

/**
 * @desc   Create New Employee Record in MongoDB
 * @route  POST /api/employees
 */
const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Employee registered successfully in MongoDB Atlas.',
      data: employee
    });
  } catch (error) {
    // Handle Duplicate Key Error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        success: false,
        message: `Duplicate entry error: An employee with this ${field} already exists.`
      });
    }

    // Handle Mongoose Validation Errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed on employee fields.',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create employee.',
      error: error.message
    });
  }
};

/**
 * @desc   Update Employee Details in MongoDB
 * @route  PUT /api/employees/:id
 */
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    let query = {};
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      query = { _id: id };
    } else {
      query = { empId: id.toUpperCase() };
    }

    const updatedEmployee = await Employee.findOneAndUpdate(
      query,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: `Employee "${id}" not found for update.`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee record updated successfully.',
      data: updatedEmployee
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed on update.',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update employee.',
      error: error.message
    });
  }
};

/**
 * @desc   Delete Employee from MongoDB
 * @route  DELETE /api/employees/:id
 */
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    let query = {};
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      query = { _id: id };
    } else {
      query = { empId: id.toUpperCase() };
    }

    const deletedEmployee = await Employee.findOneAndDelete(query);

    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: `Employee "${id}" not found for deletion.`
      });
    }

    res.status(200).json({
      success: true,
      message: `Employee "${deletedEmployee.firstName} ${deletedEmployee.lastName}" (${deletedEmployee.empId}) deleted successfully.`,
      data: deletedEmployee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete employee.',
      error: error.message
    });
  }
};

/**
 * @desc   Department Aggregate Metrics & Analytics (MongoDB Aggregation Pipeline)
 * @route  GET /api/employees/stats/summary
 */
const getEmployeeSummaryStats = async (req, res) => {
  try {
    const stats = await Employee.aggregate([
      {
        $group: {
          _id: '$department',
          totalEmployees: { $sum: 1 },
          avgSalary: { $avg: '$salary' },
          minSalary: { $min: '$salary' },
          maxSalary: { $max: '$salary' }
        }
      },
      {
        $project: {
          department: '$_id',
          totalEmployees: 1,
          avgSalary: { $round: ['$avgSalary', 2] },
          minSalary: 1,
          maxSalary: 1,
          _id: 0
        }
      },
      { $sort: { totalEmployees: -1 } }
    ]);

    const totalHeadcount = await Employee.countDocuments();

    res.status(200).json({
      success: true,
      totalHeadcount,
      departmentStats: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to compute employee summary statistics.',
      error: error.message
    });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeSummaryStats
};
