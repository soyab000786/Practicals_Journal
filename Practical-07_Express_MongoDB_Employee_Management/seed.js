require('dotenv').config();
const mongoose = require('mongoose');
const Employee = require('./models/Employee');

const sampleEmployees = [
  {
    empId: 'EMP101',
    firstName: 'Soyab',
    lastName: 'Mansuri',
    email: 'soyab.mansuri@company.com',
    phone: '9876543210',
    department: 'Engineering',
    designation: 'Lead Full Stack Engineer',
    salary: 85000,
    status: 'Active'
  },
  {
    empId: 'EMP102',
    firstName: 'Ananya',
    lastName: 'Sharma',
    email: 'ananya.sharma@company.com',
    phone: '9812345678',
    department: 'Product',
    designation: 'Senior Product Manager',
    salary: 95000,
    status: 'Active'
  },
  {
    empId: 'EMP103',
    firstName: 'Vikram',
    lastName: 'Malhotra',
    email: 'vikram.m@company.com',
    phone: '9765432109',
    department: 'Engineering',
    designation: 'Backend Architect',
    salary: 110000,
    status: 'Active'
  },
  {
    empId: 'EMP104',
    firstName: 'Pooja',
    lastName: 'Desai',
    email: 'pooja.desai@company.com',
    phone: '9845678901',
    department: 'Human Resources',
    designation: 'HR Specialist',
    salary: 55000,
    status: 'Active'
  },
  {
    empId: 'EMP105',
    firstName: 'Rohan',
    lastName: 'Verma',
    email: 'rohan.v@company.com',
    phone: '9834567812',
    department: 'Finance',
    designation: 'Financial Analyst',
    salary: 65000,
    status: 'On Leave'
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB database...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB.');

    console.log('Clearing existing employee documents...');
    await Employee.deleteMany({});

    console.log('Inserting sample employee records...');
    await Employee.insertMany(sampleEmployees);

    console.log(`🎉 Successfully seeded ${sampleEmployees.length} employees into MongoDB!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeder Failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
