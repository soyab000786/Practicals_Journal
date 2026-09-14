# Practical 01: Functional Components, JSX & Reusability

## 🎯 Practical Aim / Objective
> **Practical Title:** Build a React application using Functional Components, JSX and Component Reusability concepts.

---

## 📖 Theory & Core Concepts

### 1. Functional Components
In modern React, **Functional Components** are plain JavaScript functions that accept `props` as an argument and return React elements (JSX). They are cleaner, easier to test, and support React Hooks.

```jsx
function Header({ title }) {
  return <h1>{title}</h1>;
}
```

### 2. JSX (JavaScript XML)
**JSX** is a syntax extension for JavaScript that allows you to write HTML-like markup inside JavaScript files. JSX gets compiled to `React.createElement()` calls behind the scenes.

**Key JSX Rules:**
- Elements must return a single root element or React Fragment (`<>...</>`).
- Attributes use camelCase (e.g. `className` instead of `class`, `onClick` instead of `onclick`).
- JavaScript expressions are embedded within curly braces `{}`.

### 3. Component Reusability
Component Reusability is the principle of creating modular, configurable UI components that can be used repeatedly across different parts of the application by passing dynamic `props`.

In this practical, components like `Button`, `Badge`, `Card`, and `CourseCard` are built once and reused multiple times with different data and configurations.

---

## 📂 Project Structure
```
Practical-01_React_Functional_Components/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── Header.jsx       # Header with dynamic practical title & subtitle
        ├── Footer.jsx       # Footer component
        ├── Button.jsx       # Reusable button with variants (primary, secondary, success, sm)
        ├── Badge.jsx        # Reusable tag/badge with color variants
        ├── Card.jsx         # Reusable feature card
        └── CourseCard.jsx   # Nested reusable card displaying course information
```

---

## 🚀 How to Run

1. Open a terminal inside this directory:
   ```bash
   cd Practical-01_React_Functional_Components
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the displayed URL (e.g. `http://localhost:5173`) in your browser.

---

## 🖥️ Expected Output
- Responsive header with practical title badge.
- Reusable Concept Cards demonstrating 3 distinct features.
- Reusable Course Cards rendering dynamically from an array with customized badges and action buttons.
- Live showcase of reusable button and badge components with different themes.
