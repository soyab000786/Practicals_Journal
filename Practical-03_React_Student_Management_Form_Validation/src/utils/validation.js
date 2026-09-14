/**
 * Utility for Form Validation rules
 */
export const validateStudentForm = (formData, existingStudents = [], currentEditingId = null) => {
  const errors = {};

  // 1. Full Name Validation
  if (!formData.fullName || !formData.fullName.trim()) {
    errors.fullName = 'Full Name is required.';
  } else if (formData.fullName.trim().length < 3) {
    errors.fullName = 'Full Name must be at least 3 characters.';
  } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName.trim())) {
    errors.fullName = 'Full Name can only contain letters and spaces.';
  }

  // 2. Roll Number Validation
  if (!formData.rollNo || !formData.rollNo.trim()) {
    errors.rollNo = 'Enrollment / Roll No is required.';
  } else if (!/^[A-Za-z0-9_-]{3,15}$/.test(formData.rollNo.trim())) {
    errors.rollNo = 'Roll No must be 3-15 alphanumeric characters.';
  } else {
    // Check uniqueness
    const duplicate = existingStudents.find(
      s => s.rollNo.toLowerCase() === formData.rollNo.trim().toLowerCase() && s.id !== currentEditingId
    );
    if (duplicate) {
      errors.rollNo = 'This Roll No is already registered.';
    }
  }

  // 3. Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = 'Please enter a valid email address (e.g. name@domain.com).';
  }

  // 4. Phone Number Validation
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!formData.phone || !formData.phone.trim()) {
    errors.phone = '10-digit Mobile Number is required.';
  } else if (!phoneRegex.test(formData.phone.trim())) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number starting with 6-9.';
  }

  // 5. Department / Course Selection
  if (!formData.department) {
    errors.department = 'Please select a department / branch.';
  }

  // 6. Semester Selection
  if (!formData.semester) {
    errors.semester = 'Please select the current semester.';
  }

  // 7. Gender Validation
  if (!formData.gender) {
    errors.gender = 'Please select gender.';
  }

  // 8. Skills / Interests Validation (Minimum 1 skill selected)
  if (!formData.skills || formData.skills.length === 0) {
    errors.skills = 'Please select at least one skill or interest.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
