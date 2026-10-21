import React, { memo } from 'react';
import TaskItem from './TaskItem.jsx';

function TaskList({ tasks, onToggleComplete, onUpdatePriority, onRequestDelete, busyTaskId }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p className="status-text">No tasks yet. Create your first task above!</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggleComplete={onToggleComplete}
          onUpdatePriority={onUpdatePriority}
          onRequestDelete={onRequestDelete}
          isBusy={busyTaskId === task._id}
        />
      ))}
    </ul>
  );
}

// React.memo optimization: Prevents re-rendering TaskList when unrelated parent state changes
export default memo(TaskList);
