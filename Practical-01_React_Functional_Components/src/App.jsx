import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Card from './components/Card';
import CourseCard from './components/CourseCard';
import Button from './components/Button';
import Badge from './components/Badge';

function App() {
  // Sample data to demonstrate component reusability with JSX and props
  const coreConcepts = [
    {
      id: 1,
      icon: '⚛️',
      title: 'Functional Components',
      description: 'JavaScript functions that accept props as an argument and return JSX. They are simpler, lightweight, and modern standard in React.',
      category: 'React Core',
    },
    {
      id: 2,
      icon: '✨',
      title: 'JSX Syntax',
      description: 'JavaScript XML allows writing HTML-like syntax inside JavaScript, transpiled to React.createElement() calls for high readability.',
      category: 'Syntax',
    },
    {
      id: 3,
      icon: '🔄',
      title: 'Component Reusability',
      description: 'Building isolated, reusable UI blocks (Buttons, Cards, Badges) that receive dynamic props to adapt across different application views.',
      category: 'Architecture',
    }
  ];

  const courses = [
    {
      id: 'CS101',
      courseCode: 'REACT-101',
      title: 'Modern React with JSX',
      instructor: 'Dr. John Doe',
      duration: '6 Weeks',
      level: 'Beginner',
      rating: 4.8
    },
    {
      id: 'CS102',
      courseCode: 'NODE-201',
      title: 'Backend Mastery with Express',
      instructor: 'Prof. Jane Smith',
      duration: '8 Weeks',
      level: 'Intermediate',
      rating: 4.9
    },
    {
      id: 'CS103',
      courseCode: 'MERN-301',
      title: 'Full Stack MERN Architecture',
      instructor: 'Alex Johnson',
      duration: '12 Weeks',
      level: 'Advanced',
      rating: 4.7
    }
  ];

  const handleEnroll = (courseTitle) => {
    alert(`🎉 Successfully enrolled in: ${courseTitle}`);
  };

  const handleLearnMore = (conceptTitle) => {
    alert(`📖 Exploring details for: ${conceptTitle}`);
  };

  return (
    <div className="app-container">
      {/* 1. Header Functional Component */}
      <Header
        practicalNo="Practical No. 01"
        title="Functional Components, JSX & Reusability"
        subtitle="Demonstrating React Functional Component Architecture, JSX templating, and reusable UI components"
      />

      <main className="main-content">
        {/* Concept Introduction Box */}
        <div className="concept-box">
          <h3>💡 Practical Objective</h3>
          <p>
            Build a clean React application utilizing Functional Components, JSX expressions, and modular 
            Component Reusability. Reusable components like <code>Button</code>, <code>Badge</code>, <code>Card</code>, 
            and <code>CourseCard</code> are reused throughout the interface with varying props.
          </p>
        </div>

        {/* Section 1: Reusable Core Concept Cards */}
        <section className="section">
          <h2 className="section-title">
            <span>🧩</span> Core React Concepts (Reusable Card Component)
          </h2>
          <p className="section-desc">
            The same <code>&lt;Card /&gt;</code> component is reused 3 times with different props data.
          </p>
          
          <div className="grid-3">
            {coreConcepts.map((item) => (
              <Card
                key={item.id}
                icon={item.icon}
                title={item.title}
                description={item.description}
                category={item.category}
                actionLabel="Explore Concept"
                onAction={() => handleLearnMore(item.title)}
              />
            ))}
          </div>
        </section>

        {/* Section 2: Reusable Course Cards */}
        <section className="section">
          <h2 className="section-title">
            <span>📚</span> Available Courses (Reusable CourseCard Component)
          </h2>
          <p className="section-desc">
            Demonstrating nested reusable components (<code>&lt;Badge /&gt;</code> and <code>&lt;Button /&gt;</code> inside <code>&lt;CourseCard /&gt;</code>).
          </p>

          <div className="grid-3">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                courseCode={course.courseCode}
                title={course.title}
                instructor={course.instructor}
                duration={course.duration}
                level={course.level}
                rating={course.rating}
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        </section>

        {/* Section 3: Standalone Reusable UI Elements */}
        <section className="section">
          <h2 className="section-title">
            <span>🎨</span> Reusable UI Buttons & Badges Showcase
          </h2>
          <p className="section-desc">
            Buttons and Badges rendering with different variant properties.
          </p>

          <div className="custom-card" style={{ gap: '1.25rem' }}>
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Button Variants:</h4>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Button variant="primary" onClick={() => alert('Primary Clicked')}>Primary Button</Button>
                <Button variant="secondary" onClick={() => alert('Secondary Clicked')}>Secondary Button</Button>
                <Button variant="success" onClick={() => alert('Success Clicked')}>Success Button</Button>
                <Button variant="primary" size="sm" onClick={() => alert('Small Clicked')}>Small Button</Button>
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Badge Variants:</h4>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Badge text="Primary Tag" variant="primary" />
                <Badge text="Active Status" variant="success" />
                <Badge text="Pending Review" variant="warning" />
                <Badge text="Informational" variant="info" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Functional Component */}
      <Footer />
    </div>
  );
}

export default App;
