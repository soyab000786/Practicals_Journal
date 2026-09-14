# Practical 02: Props, State Management & Event Handling

## 🎯 Practical Aim / Objective
> **Practical Title:** Develop a React application implementing Props, State Management and Event Handling.

---

## 📖 Theory & Core Concepts

### 1. Props (Properties)
- **Props** represent arbitrary inputs passed from a parent component to a child component.
- Props are **read-only** (immutable).
- Data flows in a **single direction** (top-to-bottom).
- Functions can also be passed as props to allow child components to trigger changes in parent state (Callback Props).

### 2. State Management (`useState` Hook)
- **State** is a built-in React object used to store data that changes over time and triggers component re-rendering.
- The `useState` hook syntax:
  ```jsx
  const [count, setCount] = useState(0);
  ```
- Supports primitive types (number, string, boolean), complex objects, and arrays.

### 3. Event Handling in React
- React uses **Synthetic Events**, a cross-browser wrapper around native browser events.
- Event names are camelCase (e.g. `onClick`, `onChange`, `onSubmit`, `onKeyDown`).
- Event handlers are passed as function references rather than strings.

---

## 📂 Project Structure
```
Practical-02_React_Props_State_Events/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── Header.jsx             # Reusable header receiving props
        ├── CounterSection.jsx     # Numeric state & step increment/decrement
        ├── TaskManager.jsx        # Array state, filter tabs & form submit
        ├── TaskItem.jsx           # Child component receiving task prop & callback
        ├── UserProfileCard.jsx    # Object state with 2-way form binding
        └── InteractiveBox.jsx     # Mouse coordinates & keyboard event tester
```

---

## 🚀 How to Run

1. Open a terminal inside this directory:
   ```bash
   cd Practical-02_React_Props_State_Events
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open the browser at `http://localhost:5173`.

---

## 🖥️ Demonstrated Functionalities
1. **Interactive Counter:** Configurable step value, increment, decrement, reset, and doubling operations.
2. **Task Manager:** Add new tasks, toggle completed state, delete items, and filter by Active/Completed.
3. **Live User Profile:** Real-time synchronization between form fields and profile card preview.
4. **Interactive Playground:** Tracking mouse cursor `(X, Y)` position and capturing synthetic keyboard keystrokes.
