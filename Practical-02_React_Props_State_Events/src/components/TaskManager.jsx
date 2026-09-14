import React, { useState } from 'react';
import TaskItem from './TaskItem';

/**
 * TaskManager component
 * Demonstrates:
 * 1. Managing array state in React
 * 2. Form submission event (onSubmit & e.preventDefault())
 * 3. Passing functions as props down to child components
 * 4. Filtering state (All, Active, Completed)
 */
function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React Props & Component Hierarchy', completed: true },
    { id: 2, text: 'Master useState hook and functional updates', completed: false },
    { id: 3, text: 'Handle Synthetic Events in React', completed: false }
  ]);

  const [inputTask, setInputTask] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!inputTask.trim()) return;

    const newTask = {
      id: Date.now(),
      text: inputTask.trim(),
      completed: false
    };

    setTasks([newTask, ...tasks]);
    setInputTask('');
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="card">
      <h3 className="card-title">
        <span>📝</span> Task Manager (Props, List State & Callbacks)
      </h3>
      <p className="card-subtitle">
        Demonstrates parent-child state synchronization and callback prop patterns.
      </p>

      {/* Input Form with onSubmit */}
      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <input
          type="text"
          placeholder="Type a new task and press Add or Enter..."
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
          ➕ Add Task
        </button>
      </form>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button
          className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setFilter('all')}
        >
          All ({tasks.length})
        </button>
        <button
          className={`btn btn-sm ${filter === 'active' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setFilter('active')}
        >
          Active ({tasks.filter(t => !t.completed).length})
        </button>
        <button
          className={`btn btn-sm ${filter === 'completed' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({tasks.filter(t => t.completed).length})
        </button>
      </div>

      {/* Task List */}
      <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
        {filteredTasks.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1.5rem 0' }}>
            No tasks found in this view.
          </p>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskManager;
