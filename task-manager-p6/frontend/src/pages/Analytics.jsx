import React, { useState, lazy, Suspense } from 'react';
import LoadingFallback from '../components/LoadingFallback.jsx';

// Supplementary Problem: Component-level lazy loading
// The heavy visualizer chunk is only fetched when the user clicks "Show Visualizer"
const HeavyTaskChart = lazy(() => import('../components/HeavyTaskChart.jsx'));

function Analytics({ tasks = [] }) {
  const [showChart, setShowChart] = useState(false);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const highPriorityTasks = tasks.filter(t => t.priority === 'high').length;

  return (
    <div className="page-container page-analytics">
      <div className="page-header">
        <div>
          <h2>Productivity Analytics</h2>
          <p className="page-subtitle">
            Real-time performance metrics and completion velocity calculated from your active tasks.
          </p>
        </div>
        <div className="analytics-actions-bar">
          <button
            type="button"
            className="btn-toggle-chart"
            onClick={() => setShowChart(prev => !prev)}
          >
            {showChart ? 'Hide Visualizer' : 'Show Visualizer'}
          </button>
        </div>
      </div>

      <div className="analytics-summary-grid">
        <div className="stat-card">
          <div className="stat-icon stat-blue">📋</div>
          <div className="stat-content">
            <span className="stat-value">{totalTasks}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-green">✅</div>
          <div className="stat-content">
            <span className="stat-value">{completedTasks}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-yellow">⏳</div>
          <div className="stat-content">
            <span className="stat-value">{pendingTasks}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-purple">⚡</div>
          <div className="stat-content">
            <span className="stat-value">{completionRate}%</span>
            <span className="stat-label">Completion Rate</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-red">🔴</div>
          <div className="stat-content">
            <span className="stat-value">{highPriorityTasks}</span>
            <span className="stat-label">High Priority</span>
          </div>
        </div>
      </div>

      {showChart && (
        <Suspense fallback={<LoadingFallback message="Loading Visualizer..." />}>
          <HeavyTaskChart tasks={tasks} />
        </Suspense>
      )}
    </div>
  );
}

export default Analytics;
