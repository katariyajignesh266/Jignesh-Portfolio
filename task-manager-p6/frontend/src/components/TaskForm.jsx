import React, { useState, memo } from 'react';

function TaskForm({ onCreate, isCreating }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({ title: title.trim(), description: description.trim(), priority });
    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title (required)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isCreating}
        required
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isCreating}
      />
      <select 
        value={priority} 
        onChange={(e) => setPriority(e.target.value)}
        disabled={isCreating}
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <button type="submit" disabled={isCreating || !title.trim()}>
        {isCreating ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}

// React.memo optimization: Prevents re-rendering when parent state (like toasts or modals) changes
export default memo(TaskForm);
