import React from 'react';

/**
 * TaskItem component
 * Demonstrates:
 * 1. Receiving props (task object, onToggle, onDelete callbacks)
 * 2. Event delegation to parent handlers
 */
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
          id={`task-${task.id}`}
        />
        <label htmlFor={`task-${task.id}`} className="task-text" style={{ cursor: 'pointer', fontWeight: 500 }}>
          {task.text}
        </label>
      </div>

      <button
        className="btn btn-danger btn-sm"
        onClick={() => onDelete(task.id)}
        title="Delete task"
      >
        🗑️ Delete
      </button>
    </div>
  );
}

export default TaskItem;
