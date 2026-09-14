import React, { useState, useEffect } from 'react';
import { validateStudentForm } from '../utils/validation';

const initialFormState = {
  fullName: '',
  rollNo: '',
  email: '',
  phone: '',
  department: '',
  semester: '',
  gender: '',
  skills: [],
  address: ''
};

const AVAILABLE_SKILLS = ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB', 'SQL', 'Java'];

function StudentForm({ onSaveStudent, editingStudent, onCancelEdit, existingStudents }) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
      setErrors({});
      setTouched({});
    } else {
      setFormData(initialFormState);
      setErrors({});
      setTouched({});
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const { errors: newErrors } = validateStudentForm(formData, existingStudents, editingStudent ? editingStudent.id : null);
    if (newErrors[name]) {
      setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills };
    });
    if (errors.skills) {
      setErrors(prev => ({ ...prev, skills: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateStudentForm(
      formData,
      existingStudents,
      editingStudent ? editingStudent.id : null
    );

    if (!isValid) {
      setErrors(validationErrors);
      // Mark all fields as touched to display errors
      const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
      setTouched(allTouched);
      return;
    }

    onSaveStudent(formData);
    setFormData(initialFormState);
    setErrors({});
    setTouched({});
  };

  return (
    <div className="card">
      <div className="card-title">
        <span>{editingStudent ? '✏️ Edit Student Record' : '📝 Add New Student'}</span>
        {editingStudent && (
          <span style={{ fontSize: '0.8rem', color: 'var(--primary-dark)', fontWeight: 600 }}>
            Editing ID: {editingStudent.id}
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            name="fullName"
            placeholder="e.g. Soyab Mansuri"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${touched.fullName && errors.fullName ? 'has-error' : ''}`}
          />
          {touched.fullName && errors.fullName && <p className="error-text">⚠️ {errors.fullName}</p>}
        </div>

        {/* Roll Number & Email in 2 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div className="form-group">
            <label className="form-label">Enrollment / Roll No *</label>
            <input
              type="text"
              name="rollNo"
              placeholder="e.g. 21CS045"
              value={formData.rollNo}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${touched.rollNo && errors.rollNo ? 'has-error' : ''}`}
            />
            {touched.rollNo && errors.rollNo && <p className="error-text">⚠️ {errors.rollNo}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. student@college.edu"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${touched.email && errors.email ? 'has-error' : ''}`}
            />
            {touched.email && errors.email && <p className="error-text">⚠️ {errors.email}</p>}
          </div>
        </div>

        {/* Phone & Department */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              maxLength="10"
              placeholder="10-digit Mobile"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${touched.phone && errors.phone ? 'has-error' : ''}`}
            />
            {touched.phone && errors.phone && <p className="error-text">⚠️ {errors.phone}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Department / Branch *</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-select ${touched.department && errors.department ? 'has-error' : ''}`}
            >
              <option value="">-- Select Branch --</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="AI & Data Science">AI & Data Science</option>
              <option value="Electronics & Comm">Electronics & Comm</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
            </select>
            {touched.department && errors.department && <p className="error-text">⚠️ {errors.department}</p>}
          </div>
        </div>

        {/* Semester & Gender */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div className="form-group">
            <label className="form-label">Current Semester *</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-select ${touched.semester && errors.semester ? 'has-error' : ''}`}
            >
              <option value="">-- Select Sem --</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                <option key={s} value={`Semester ${s}`}>Semester {s}</option>
              ))}
            </select>
            {touched.semester && errors.semester && <p className="error-text">⚠️ {errors.semester}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Gender *</label>
            <div className="radio-group" style={{ marginTop: '0.6rem' }}>
              {['Male', 'Female', 'Other'].map(g => (
                <label key={g} className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                  />
                  {g}
                </label>
              ))}
            </div>
            {touched.gender && errors.gender && <p className="error-text">⚠️ {errors.gender}</p>}
          </div>
        </div>

        {/* Skills / Interests (Checkboxes) */}
        <div className="form-group">
          <label className="form-label">Technical Skills & Interests *</label>
          <div className="checkbox-group">
            {AVAILABLE_SKILLS.map(skill => (
              <label key={skill} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.skills.includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                />
                {skill}
              </label>
            ))}
          </div>
          {touched.skills && errors.skills && <p className="error-text">⚠️ {errors.skills}</p>}
        </div>

        {/* Address / Remarks */}
        <div className="form-group">
          <label className="form-label">Residential Address / City (Optional)</label>
          <textarea
            name="address"
            rows="2"
            placeholder="Enter student city or address details..."
            value={formData.address}
            onChange={handleChange}
            className="form-textarea"
          ></textarea>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
            {editingStudent ? '💾 Update Student' : '➕ Register Student'}
          </button>
          {editingStudent && (
            <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
