import React from 'react';

function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
        <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📭</p>
        <h4>No Student Records Found</h4>
        <p style={{ fontSize: '0.88rem' }}>Register a student from the form on the left or clear your filter.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="student-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name & Email</th>
            <th>Dept & Sem</th>
            <th>Gender & Phone</th>
            <th>Skills</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                <strong style={{ color: 'var(--primary-dark)' }}>{student.rollNo}</strong>
              </td>
              <td>
                <div style={{ fontWeight: 600 }}>{student.fullName}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{student.email}</div>
              </td>
              <td>
                <div><span className="badge badge-dept">{student.department}</span></div>
                <div style={{ marginTop: '0.2rem' }}><span className="badge badge-sem">{student.semester}</span></div>
              </td>
              <td>
                <div>{student.gender}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>📞 {student.phone}</div>
              </td>
              <td>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem', maxWidth: '200px' }}>
                  {student.skills && student.skills.map(s => (
                    <span key={s} className="badge badge-skill">{s}</span>
                  ))}
                </div>
              </td>
              <td>
                <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => onEdit(student)}
                    title="Edit Record"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => onDelete(student.id, student.fullName)}
                    title="Delete Record"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
