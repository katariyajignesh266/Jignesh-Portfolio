import React, { useState } from 'react';

function Projects() {
  const [filter, setFilter] = useState('all');

  const sampleProjects = [
    {
      id: 1,
      name: 'Full-Stack Integration (Practicals 1–7)',
      category: 'academic',
      status: 'Completed',
      progress: 100,
      tasksCount: 18,
      lead: 'Express & MongoDB',
      description: 'End-to-end task manager with CRUD, validation, and JWT token authentication.'
    },
    {
      id: 2,
      name: 'Performance Optimization & Code Splitting',
      category: 'academic',
      status: 'In Progress',
      progress: 85,
      tasksCount: 6,
      lead: 'React 18 & Vite',
      description: 'Route-based lazy loading with React.lazy(), Suspense, and build chunk analysis.'
    },
    {
      id: 3,
      name: 'Real-time WebSocket Notifications',
      category: 'advanced',
      status: 'Planned',
      progress: 20,
      tasksCount: 12,
      lead: 'Socket.io',
      description: 'Instant synchronization of task mutations across multiple logged-in client sessions.'
    },
    {
      id: 4,
      name: 'Microservices & Docker Deployment',
      category: 'devops',
      status: 'Backlog',
      progress: 0,
      tasksCount: 8,
      lead: 'Docker & Compose',
      description: 'Containerized deployment pipeline with isolated frontend, backend, and database containers.'
    }
  ];

  const filtered = filter === 'all'
    ? sampleProjects
    : sampleProjects.filter(p => p.category === filter);

  return (
    <div className="page-container page-projects">
      <div className="page-header">
        <div>
          <h2>Projects Directory</h2>
          <p className="page-subtitle">
            Manage team deliverables, milestones, and development sprints.
          </p>
        </div>
      </div>

      <div className="projects-filter-bar">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Projects ({sampleProjects.length})
        </button>
        <button
          className={`filter-btn ${filter === 'academic' ? 'active' : ''}`}
          onClick={() => setFilter('academic')}
        >
          Academic
        </button>
        <button
          className={`filter-btn ${filter === 'advanced' ? 'active' : ''}`}
          onClick={() => setFilter('advanced')}
        >
          Advanced
        </button>
        <button
          className={`filter-btn ${filter === 'devops' ? 'active' : ''}`}
          onClick={() => setFilter('devops')}
        >
          DevOps
        </button>
      </div>

      <div className="projects-grid">
        {filtered.map((proj) => (
          <div key={proj.id} className="project-card">
            <div className="project-card-header">
              <span className={`status-badge status-${proj.status.toLowerCase().replace(' ', '-')}`}>
                {proj.status}
              </span>
              <span className="project-category">{proj.category}</span>
            </div>
            <h3 className="project-title">{proj.name}</h3>
            <p className="project-desc">{proj.description}</p>

            <div className="progress-section">
              <div className="progress-labels">
                <span>Progress</span>
                <span>{proj.progress}%</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${proj.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="project-footer">
              <span className="project-meta">Stack: {proj.lead}</span>
              <span className="project-meta">📋 {proj.tasksCount} tasks</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
