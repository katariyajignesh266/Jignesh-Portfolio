import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Eager components (Core UI shell)
import Navbar from './components/Navbar.jsx';
import ConfirmModal from './components/ConfirmModal.jsx';
import AuthModal from './components/AuthModal.jsx';
import UserProfileModal from './components/UserProfileModal.jsx';
import Toast from './components/Toast.jsx';
import LoadingFallback from './components/LoadingFallback.jsx';
import { useToast } from './hooks/useToast.js';

// API services
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  getToken,
  getStoredUser,
  logout,
  onAuthError
} from './api.js';

/**
 * Route-Based Code Splitting via React.lazy() (Practical 8 Core Architecture)
 * Each route is packaged by Vite into an independent chunk file.
 * The browser only downloads the chunk when the user navigates to that path.
 */
const Home = lazy(() => import('./pages/Home.jsx'));
const Projects = lazy(() => import('./pages/Projects.jsx'));
const Analytics = lazy(() => import('./pages/Analytics.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));

function App() {
  const [token, setToken] = useState(() => getToken());
  const [user, setUser] = useState(() => getStoredUser());
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [busyTaskId, setBusyTaskId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // Modal states
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    task: null,
    isDeleting: false
  });
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Toast notifications
  const { toasts, showToast, removeToast } = useToast();

  // Listen for 401 Unauthorized events from api.js
  useEffect(() => {
    const unsubscribe = onAuthError(() => {
      setToken('');
      setUser(null);
      setTasks([]);
      showToast('Session expired or unauthorized. Please sign in again.', 'warning');
    });
    return unsubscribe;
  }, [showToast]);

  // Load tasks (memoized)
  const loadTasks = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      setError('');
      const data = await fetchTasks();
      setTasks(data || []);
    } catch (err) {
      const msg = err.message || 'Failed to connect to the backend server.';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  }, [token, showToast]);

  useEffect(() => {
    if (token) {
      loadTasks();
    }
  }, [token, loadTasks]);

  // Authentication callbacks
  const handleAuthSuccess = useCallback((userData, userToken) => {
    setUser(userData);
    setToken(userToken);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setToken('');
    setUser(null);
    setTasks([]);
    showToast('Logged out successfully.', 'info');
  }, [showToast]);

  // Task creation handler (memoized for React.memo optimization)
  const handleCreate = useCallback(async (taskData) => {
    const tempId = `temp-${Date.now()}`;
    const optimisticTask = {
      _id: tempId,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      isOptimistic: true
    };

    setTasks((prev) => [optimisticTask, ...prev]);
    setIsCreating(true);
    setError('');

    try {
      const savedTask = await createTask(taskData);
      setTasks((prev) => prev.map((t) => (t._id === tempId ? savedTask : t)));
      showToast('Task created and saved to MongoDB!', 'success');
    } catch (err) {
      setTasks((prev) => prev.filter((t) => t._id !== tempId));
      const msg = err.message || 'Failed to create task';
      setError(msg);
      showToast(`Creation failed: ${msg}`, 'error');
    } finally {
      setIsCreating(false);
    }
  }, [showToast]);

  // Toggle complete handler (memoized)
  const handleToggleComplete = useCallback(async (task) => {
    setBusyTaskId(task._id);
    try {
      const updated = await updateTask(task._id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      showToast(
        `Task "${updated.title}" marked as ${updated.completed ? 'completed' : 'pending'}.`,
        'success'
      );
      setError('');
    } catch (err) {
      const msg = err.message || 'Failed to update task';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setBusyTaskId(null);
    }
  }, [showToast]);

  // Update priority handler (memoized)
  const handleUpdatePriority = useCallback(async (task, newPriority) => {
    setBusyTaskId(task._id);
    try {
      const updated = await updateTask(task._id, { priority: newPriority });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      showToast(`Priority changed to "${newPriority}" for "${updated.title}".`, 'success');
      setError('');
    } catch (err) {
      const msg = err.message || 'Failed to update priority';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setBusyTaskId(null);
    }
  }, [showToast]);

  // Delete modal triggers (memoized)
  const handleRequestDelete = useCallback((task) => {
    setDeleteModal({ isOpen: true, task, isDeleting: false });
  }, []);

  const handleCancelDelete = useCallback(() => {
    setDeleteModal((prev) => {
      if (prev.isDeleting) return prev;
      return { isOpen: false, task: null, isDeleting: false };
    });
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    const taskToDelete = deleteModal.task;
    if (!taskToDelete) return;

    setDeleteModal((prev) => ({ ...prev, isDeleting: true }));
    try {
      await deleteTask(taskToDelete._id);
      setTasks((prev) => prev.filter((t) => t._id !== taskToDelete._id));
      showToast(`Task "${taskToDelete.title}" deleted successfully.`, 'success');
      setDeleteModal({ isOpen: false, task: null, isDeleting: false });
      setError('');
    } catch (err) {
      const msg = err.message || 'Failed to delete task';
      setError(msg);
      showToast(msg, 'error');
      setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
    }
  }, [deleteModal.task, showToast]);

  const handleOpenProfile = useCallback(() => {
    setProfileModalOpen(true);
  }, []);

  const handleCloseProfile = useCallback(() => {
    setProfileModalOpen(false);
  }, []);

  return (
    <div className="app">
      {/* Toast notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* User profile modal (/api/auth/me) */}
      <UserProfileModal
        isOpen={profileModalOpen}
        onClose={handleCloseProfile}
        showToast={showToast}
      />

      {/* Delete confirmation modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Task Confirmation"
        message={`Are you sure you want to delete "${deleteModal.task?.title}"? This will permanently remove it from MongoDB.`}
        confirmText="Yes, Delete"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={deleteModal.isDeleting}
      />

      {/* Main App Layout */}
      {!token ? (
        <AuthModal onAuthSuccess={handleAuthSuccess} showToast={showToast} />
      ) : (
        <>
          {/* Top Navigation Bar with active route indication */}
          <Navbar
            user={user}
            onOpenProfile={handleOpenProfile}
            onLogout={handleLogout}
          />

          {/* Route-Based Code Splitting with Suspense and Meaningful Fallback UI */}
          <main className="main-content-area">
            <Suspense fallback={<LoadingFallback message="Loading page..." />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      tasks={tasks}
                      onCreate={handleCreate}
                      isCreating={isCreating}
                      loading={loading}
                      error={error}
                      onRetry={loadTasks}
                      onToggleComplete={handleToggleComplete}
                      onUpdatePriority={handleUpdatePriority}
                      onRequestDelete={handleRequestDelete}
                      busyTaskId={busyTaskId}
                    />
                  }
                />
                <Route path="/projects" element={<Projects />} />
                <Route path="/analytics" element={<Analytics tasks={tasks} />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
