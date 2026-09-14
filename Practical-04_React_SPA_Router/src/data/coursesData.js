export const COURSES = [
  {
    id: 'react-mastery',
    title: 'Modern React.js & Redux Toolkit',
    shortDesc: 'Master Functional Components, React Hooks, Context API, and modern state architecture.',
    fullDesc: 'This comprehensive course takes you from fundamental React concepts to advanced enterprise patterns. You will build single page applications using React Router, manage complex global states with Redux Toolkit, and master custom hooks for optimal performance.',
    duration: '8 Weeks',
    level: 'Intermediate',
    category: 'Frontend',
    instructor: 'Dr. Sarah Jenkins',
    rating: 4.9,
    enrolledStudents: 1240,
    modules: [
      'React Fundamentals & JSX Syntax',
      'Hooks in Depth (useState, useEffect, useMemo, useCallback)',
      'Single Page Routing with React Router v6',
      'Global State Management & Performance Optimization',
      'Testing with Vitest and React Testing Library'
    ],
    prerequisites: ['Basic JavaScript (ES6+)', 'HTML5 & CSS3']
  },
  {
    id: 'nodejs-express-api',
    title: 'Backend Engineering with Node.js & Express',
    shortDesc: 'Build secure, scalable RESTful APIs with Express, JWT authentication, and middleware.',
    fullDesc: 'Learn how to architect robust backend web servers using Node.js and Express.js framework. Discover middleware design patterns, error handling, rate limiting, REST best practices, and integration with databases.',
    duration: '6 Weeks',
    level: 'Intermediate',
    category: 'Backend',
    instructor: 'Prof. Michael Chang',
    rating: 4.8,
    enrolledStudents: 980,
    modules: [
      'Node.js Event Loop & Asynchronous Architecture',
      'Express.js Routing, Middleware & Controllers',
      'REST API Design & HTTP Status Codes',
      'Authentication & Authorization with JWT',
      'API Security, Rate Limiting & Deployment'
    ],
    prerequisites: ['Core JavaScript', 'Understanding of HTTP Protocol']
  },
  {
    id: 'fullstack-mern',
    title: 'Full Stack MERN Developer Bootcamp',
    shortDesc: 'End-to-end web applications combining MongoDB, Express, React, and Node.js.',
    fullDesc: 'Transform into a full-stack engineer by connecting MongoDB databases, Express backends, and responsive React user interfaces into production-ready web platforms.',
    duration: '12 Weeks',
    level: 'Advanced',
    category: 'Full Stack',
    instructor: 'Alex Rivera',
    rating: 4.95,
    enrolledStudents: 2150,
    modules: [
      'Full Stack Architecture & Monorepos',
      'Mongoose Schemas, Models & MongoDB Atlas',
      'CRUD API Integration with React Query / Axios',
      'Stateful Authentication & Protected Routes',
      'Full CI/CD Deployment to Cloud Services'
    ],
    prerequisites: ['React Basics', 'Node.js Basics']
  },
  {
    id: 'mongodb-database-design',
    title: 'MongoDB Atlas & NoSQL Architecture',
    shortDesc: 'Data modeling, indexing, aggregation pipelines, and cloud database optimization.',
    fullDesc: 'Deep dive into document-oriented database design with MongoDB. Learn schema optimization, indexes for lightning fast queries, complex aggregation pipelines, and cloud clustering with MongoDB Atlas.',
    duration: '4 Weeks',
    level: 'Beginner',
    category: 'Database',
    instructor: 'Pooja Patel',
    rating: 4.7,
    enrolledStudents: 650,
    modules: [
      'Document DB vs Relational Databases',
      'MongoDB Atlas Setup & Security Configuration',
      'CRUD Operations & Query Operators',
      'Aggregation Pipeline Mastery',
      'Indexing & Query Performance Tuning'
    ],
    prerequisites: ['Basic understanding of JSON & databases']
  }
];
