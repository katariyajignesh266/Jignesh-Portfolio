import React, { memo } from 'react';

function TaskItem({ task, onToggleComplete, onUpdatePriority, onRequestDelete, isBusy }) {
  const isOptimistic = Boolean(task.isOptimistic);

  return (
    <li className={`task-item priority-${task.priority} ${task.completed ? 'is-completed' : ''} ${isOptimistic ? 'is-optimistic' : ''}`}>
      <div className="task-main">
        <input
          type="checkbox"
          checked={task.completed}
          disabled={isBusy || isOptimistic}
          onChange={() => onToggleComplete(task)}
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <div className="task-text">
          <div className="title-row">
            <span className={task.completed ? 'title completed' : 'title'}>
              {task.title}
            </span>
            {isOptimistic && <span className="badge-optimistic">Saving...</span>}
            {isBusy && <span className="badge-syncing">Syncing...</span>}
          </div>
          {task.description && <p className="description">{task.description}</p>}
          <span className="timestamp">
            Created: {task.createdAt ? new Date(task.createdAt).toLocaleString() : 'Just now'}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <select
          value={task.priority}
          disabled={isBusy || isOptimistic}
          onChange={(e) => onUpdatePriority(task, e.target.value)}
          aria-label="Change priority"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          type="button"
          className="delete-btn"
          disabled={isBusy || isOptimistic}
          onClick={() => onRequestDelete(task)}
          title="Delete task"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

// React.memo optimization: Prevents all items in TaskList from re-rendering when only one task changes
export default memo(TaskItem);
