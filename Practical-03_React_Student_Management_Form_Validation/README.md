# Practical 03: Student Management System (Forms & Validation)

## 🎯 Practical Aim / Objective
> **Practical Title:** Create a Student Management System using React Forms, Controlled Components and Validation.

---

## 📖 Theory & Core Concepts

### 1. Controlled Components in React
In HTML, form elements like `<input>`, `<textarea>`, and `<select>` maintain their own internal state. In React, a **Controlled Component** has its mutable state kept in React's component state (via `useState`), and React controls what values are displayed on screen:
```jsx
<input
  type="text"
  name="fullName"
  value={formData.fullName}
  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
/>
```

### 2. Client-side Form Validation
- Prevents invalid or malformed data before form submission.
- Real-time feedback via `onBlur` and `onChange` events.
- Validates:
  - **Full Name:** Required, letters only, minimum 3 characters.
  - **Roll No:** Required, alphanumeric pattern, unique verification.
  - **Email:** Standard email format regex (`user@domain.com`).
  - **Phone:** 10-digit Indian telephone number format (`[6-9]\d{9}`).
  - **Select Dropdowns:** Mandatory branch & semester selection.
  - **Radio Buttons:** Gender selection.
  - **Checkboxes:** Multi-select skills with at least 1 mandatory item.

---

## 📂 Project Structure
```
Practical-03_React_Student_Management_Form_Validation/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── utils/
    │   └── validation.js       # Comprehensive validation logic & regex
    └── components/
        ├── Header.jsx          # Header with title & badges
        ├── StatsOverview.jsx   # Top department statistics cards
        ├── StudentForm.jsx     # Controlled React Form with error highlights
        └── StudentTable.jsx    # Table with Edit and Delete actions
```

---

## 🚀 How to Run

1. Open a terminal inside this directory:
   ```bash
   cd Practical-03_React_Student_Management_Form_Validation
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development server:
   ```bash
   npm run dev
   ```
4. Access `http://localhost:5173` in your web browser.

---

## 🖥️ Demonstrated Functionalities
1. **Interactive Form:** Supports text inputs, email, phone, dropdown select, radio buttons, checkboxes, and textarea.
2. **Validation Messages:** Red outline and dynamic error text below invalid fields.
3. **Full CRUD Operations:** Add new students, edit existing entries with pre-filled inputs, and delete records with confirmation.
4. **Search & Filter:** Search by name/roll/email and filter by specific academic department.
5. **Real-time Stats:** Automatic department counts and total student calculations.
