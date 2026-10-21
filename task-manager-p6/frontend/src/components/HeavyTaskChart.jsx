import React, { useState } from 'react';

function HeavyTaskChart({ tasks = [] }) {
  const [metricType, setMetricType] = useState('completion');

  const total = tasks.length;
  const highCount = tasks.filter(t => t.priority === 'high').length;
  const medCount = tasks.filter(t => t.priority === 'medium').length;
  const lowCount = tasks.filter(t => t.priority === 'low').length;

  const highPct = total > 0 ? Math.round((highCount / total) * 100) : 0;
  const medPct = total > 0 ? Math.round((medCount / total) * 100) : 0;
  const lowPct = total > 0 ? Math.round((lowCount / total) * 100) : 0;

  const priorityData = [
    { label: 'High Priority', count: highCount, color: '#ef4444', pct: `${highPct}%` },
    { label: 'Medium Priority', count: medCount, color: '#f59e0b', pct: `${medPct}%` },
    { label: 'Low Priority', count: lowCount, color: '#10b981', pct: `${lowPct}%` },
  ];

  // Distribution by day / velocity based on existing tasks
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayCounts = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
  
  tasks.forEach(t => {
    if (t.createdAt) {
      const dayName = daysOfWeek[new Date(t.createdAt).getDay()];
      if (dayCounts[dayName] !== undefined) {
        dayCounts[dayName] += 1;
      }
    }
  });

  const maxCount = Math.max(...Object.values(dayCounts), 1);
  const velocityData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
    const count = dayCounts[day] || 0;
    const height = count > 0 ? Math.min(130, Math.max(30, Math.round((count / maxCount) * 120))) : 16;
    return { label: day, value: count, height };
  });

  return (
    <div className="heavy-chart-card">
      <div className="chart-header">
        <div>
          <h4>Task Velocity & Priority Distribution</h4>
          <p className="chart-sub">Dynamic interactive metrics generated from your task database</p>
        </div>
        <div className="chart-controls">
          <button
            type="button"
            className={`chart-btn ${metricType === 'completion' ? 'active' : ''}`}
            onClick={() => setMetricType('completion')}
          >
            Weekly Distribution
          </button>
          <button
            type="button"
            className={`chart-btn ${metricType === 'priority' ? 'active' : ''}`}
            onClick={() => setMetricType('priority')}
          >
            Priority Breakdown
          </button>
        </div>
      </div>

      {metricType === 'completion' ? (
        <div className="chart-body">
          <div className="bar-chart-container">
            {velocityData.map((d) => (
              <div key={d.label} className="bar-group">
                <div className="bar-tooltip">{d.value} {d.value === 1 ? 'task' : 'tasks'}</div>
                <div
                  className="bar-column"
                  style={{ height: `${d.height}px` }}
                ></div>
                <span className="bar-label">{d.label}</span>
              </div>
            ))}
          </div>
          <div className="chart-footer-note">
            <span>Total Tasks Logged: <strong>{total}</strong></span>
            <span>Active Priorities: <strong>{highCount} High, {medCount} Medium, {lowCount} Low</strong></span>
          </div>
        </div>
      ) : (
        <div className="chart-body">
          <div className="priority-bars-container">
            {priorityData.map((p) => (
              <div key={p.label} className="priority-row">
                <div className="priority-info">
                  <span className="priority-dot" style={{ backgroundColor: p.color }}></span>
                  <span className="priority-title">{p.label}</span>
                  <span className="priority-count">{p.count} tasks ({p.pct})</span>
                </div>
                <div className="priority-track">
                  <div
                    className="priority-fill"
                    style={{ width: p.pct, backgroundColor: p.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HeavyTaskChart;
