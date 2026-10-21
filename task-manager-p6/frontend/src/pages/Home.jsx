import React from 'react';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';

function Home({
  tasks,
  onCreate,
  isCreating,
  loading,
  error,
  onRetry,
  onToggleComplete,
  onUpdatePriority,
  onRequestDelete,
  busyTaskId
}) {
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="page-container page-home">
      <div className="page-header">
        <div>
          <h2>Task Dashboard</h2>
          <p className="page-subtitle">
            Organize your daily tasks, track progress, and manage priorities seamlessly.
          </p>
        </div>
        <div className="header-stat-pills">
          <span className="stat-pill">
            <strong>{tasks.length}</strong> Total
          </span>
          <span className="stat-pill stat-pill-success">
            <strong>{completedCount}</strong> Done
          </span>
        </div>
      </div>

      <TaskForm onCreate={onCreate} isCreating={isCreating} />

      {error && (
        <div className="error-banner" role="alert">
          <div className="error-icon">⚠️</div>
          <div className="error-content">
            <strong>Error: </strong> {error}
          </div>
          <button className="retry-btn" onClick={onRetry}>
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p className="status-text">Loading your tasks...</p>
        </div>
      ) : (
        <TaskList
          tasks={tasks}
          onToggleComplete={onToggleComplete}
          onUpdatePriority={onUpdatePriority}
          onRequestDelete={onRequestDelete}
          busyTaskId={busyTaskId}
        />
      )}
    </div>
  );
}

export default React.memo(Home);
