import React from 'react';
import Header from './components/Header';
import CounterSection from './components/CounterSection';
import TaskManager from './components/TaskManager';
import UserProfileCard from './components/UserProfileCard';
import InteractiveBox from './components/InteractiveBox';

function App() {
  return (
    <div className="app-container">
      {/* Header */}
      <Header
        practicalNo="Practical No. 02"
        title="Props, State Management & Event Handling"
        subtitle="Practical implementation of Uni-directional Data Flow, useState Hook, and React Synthetic Event Handlers"
      />

      <main className="main-content">
        {/* Info Box */}
        <div style={{
          background: '#ffffff',
          borderLeft: '4px solid var(--primary)',
          padding: '1.25rem 1.5rem',
          borderRadius: '0 12px 12px 0',
          marginBottom: '2rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>
            💡 Practical Objective
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Develop a comprehensive React application demonstrating Props passing between parent-child components, 
            local State Management with the <code>useState</code> hook, and handling diverse React Synthetic Events 
            (<code>onClick</code>, <code>onChange</code>, <code>onSubmit</code>, <code>onKeyDown</code>, <code>onMouseMove</code>).
          </p>
        </div>

        {/* Row 1: Interactive Counter & Task Manager */}
        <div className="grid-2">
          <CounterSection />
          <TaskManager />
        </div>

        {/* Row 2: Live Profile Customizer & Event Playground */}
        <div className="grid-2">
          <UserProfileCard />
          <InteractiveBox />
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p><strong>Web Technology Practicals Journal</strong> &bull; Practical 02</p>
        <p style={{ marginTop: '0.35rem', fontSize: '0.8rem', color: '#64748b' }}>
          React Props, State Management & Event Handling System
        </p>
      </footer>
    </div>
  );
}

export default App;
