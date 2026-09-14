import React, { useState } from 'react';
import Header from './components/Header';
import StatsOverview from './components/StatsOverview';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';

const INITIAL_STUDENTS = [
  {
    id: 'STU-1001',
    fullName: 'Soyab Mansuri',
    rollNo: '21CS045',
    email: 'soyab@student.edu',
    phone: '9876543210',
    department: 'Computer Engineering',
    semester: 'Semester 6',
    gender: 'Male',
    skills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
    address: 'Ahmedabad, Gujarat'
  },
  {
    id: 'STU-1002',
    fullName: 'Priya Sharma',
    rollNo: '21IT012',
    email: 'priya.sharma@student.edu',
    phone: '9812345678',
    department: 'Information Technology',
    semester: 'Semester 6',
    gender: 'Female',
    skills: ['Python', 'SQL', 'React'],
    address: 'Mumbai, Maharashtra'
  },
  {
    id: 'STU-1003',
    fullName: 'Aman Verma',
    rollNo: '22AI088',
    email: 'aman.verma@student.edu',
    phone: '9765432109',
    department: 'AI & Data Science',
    semester: 'Semester 4',
    gender: 'Male',
    skills: ['Python', 'Java', 'SQL'],
    address: 'Pune, Maharashtra'
  }
];

function App() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');
  const [alertMessage, setAlertMessage] = useState(null);

  const showAlert = (text, type = 'success') => {
    setAlertMessage({ text, type });
    setTimeout(() => setAlertMessage(null), 3500);
  };

  // Add or Update student handler
  const handleSaveStudent = (studentData) => {
    if (editingStudent) {
      setStudents(prev => prev.map(s => s.id === editingStudent.id ? { ...studentData, id: s.id } : s));
      showAlert(`✅ Student record "${studentData.fullName}" updated successfully!`);
      setEditingStudent(null);
    } else {
      const newStudent = {
        ...studentData,
        id: `STU-${Date.now().toString().slice(-4)}`
      };
      setStudents(prev => [newStudent, ...prev]);
      showAlert(`🎉 Student "${studentData.fullName}" added successfully!`);
    }
  };

  // Delete student handler
  const handleDeleteStudent = (id, name) => {
    if (window.confirm(`Are you sure you want to delete student: ${name}?`)) {
      setStudents(prev => prev.filter(s => s.id !== id));
      if (editingStudent && editingStudent.id === id) {
        setEditingStudent(null);
      }
      showAlert(`🗑️ Student record "${name}" deleted.`, 'danger');
    }
  };

  // Edit initiate
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  // Filter students based on search and department
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDeptFilter === 'All' || student.department === selectedDeptFilter;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="app-container">
      {/* Header */}
      <Header
        practicalNo="Practical No. 03"
        title="Student Management System"
        subtitle="Comprehensive React Forms, Controlled Components, Live Field Validations & Full CRUD Operations"
      />

      <main className="main-content">
        {/* Toast Alert Notification */}
        {alertMessage && (
          <div style={{
            background: alertMessage.type === 'danger' ? '#fee2e2' : '#dcfce7',
            color: alertMessage.type === 'danger' ? '#991b1b' : '#166534',
            border: `1px solid ${alertMessage.type === 'danger' ? '#f87171' : '#86efac'}`,
            padding: '0.85rem 1.25rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontWeight: 600,
            fontSize: '0.9rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            {alertMessage.text}
          </div>
        )}

        {/* Top Stats Overview */}
        <StatsOverview students={students} />

        {/* 2-Column Responsive Layout: Form on Left, Table on Right */}
        <div className="layout-grid">
          {/* Left Column: Form with Controlled Components */}
          <StudentForm
            onSaveStudent={handleSaveStudent}
            editingStudent={editingStudent}
            onCancelEdit={() => setEditingStudent(null)}
            existingStudents={students}
          />

          {/* Right Column: Search, Filter & Student Records Table */}
          <div className="card">
            <div className="card-title">
              <span>📋 Registered Student Directory</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Showing {filteredStudents.length} of {students.length}
              </span>
            </div>

            {/* Filter and Search Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <input
                type="text"
                placeholder="🔍 Search by name, roll no, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
              />
              <select
                value={selectedDeptFilter}
                onChange={(e) => setSelectedDeptFilter(e.target.value)}
                className="form-select"
                style={{ width: 'auto', minWidth: '180px' }}
              >
                <option value="All">All Departments</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="AI & Data Science">AI & Data Science</option>
                <option value="Electronics & Comm">Electronics & Comm</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
              </select>
            </div>

            {/* Table */}
            <StudentTable
              students={filteredStudents}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p><strong>Web Technology Practicals Journal</strong> &bull; Practical 03</p>
        <p style={{ marginTop: '0.35rem', fontSize: '0.8rem', color: '#64748b' }}>
          Student Management System using React Forms, Controlled Components and Validation
        </p>
      </footer>
    </div>
  );
}

export default App;
