// ─────────────────────────────────────────────────────────────────────────────
// Practical 7: Central API Module with JWT Authentication & 401 Handling
// ─────────────────────────────────────────────────────────────────────────────

export const BASE_URL = 'http://localhost:5000';
const API_TASKS = `${BASE_URL}/api/tasks`;
const API_AUTH = `${BASE_URL}/api/auth`;

const TOKEN_KEY = 'awdf_p7_jwt_token';
const USER_KEY = 'awdf_p7_user_data';

// Error extractor helper
function extractErrorMessage(data, fallback) {
  if (data && Array.isArray(data.error)) return data.error.join(', ');
  if (data && data.error) return data.error;
  if (data && data.message) return data.message;
  return fallback;
}

// ─────────────────────────────────────────────────────────────────────────────
// Token and Session Management
// ─────────────────────────────────────────────────────────────────────────────
let authErrorListeners = [];

export function onAuthError(callback) {
  authErrorListeners.push(callback);
  return () => {
    authErrorListeners = authErrorListeners.filter((cb) => cb !== callback);
  };
}

function notifyAuthError() {
  authErrorListeners.forEach((cb) => cb());
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || '';
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  notifyAuthError();
}

// Build headers with Authorization: Bearer <token>
function getAuthHeaders(extraHeaders = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...extraHeaders
  };
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// Wrapper for fetch requests with automatic 401 handling
async function authorizedFetch(url, options = {}) {
  const mergedHeaders = getAuthHeaders(options.headers);
  const response = await fetch(url, { ...options, headers: mergedHeaders });

  // Handle Token Expiry / Unauthorized (401)
  if (response.status === 401) {
    logout();
    const data = await response.json().catch(() => ({}));
    const message = extractErrorMessage(data, 'Session expired or unauthorized. Please log in again.');
    throw new Error(message);
  }

  return response;
}

// ─────────────────────────────────────────────────────────────────────────────
// Authentication API Endpoints (Practical 7)
// ─────────────────────────────────────────────────────────────────────────────

export async function registerUser({ email, password }) {
  const res = await fetch(`${API_AUTH}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(extractErrorMessage(data, 'Registration failed.'));
  }

  if (data.token) {
    setToken(data.token);
  }
  if (data.user) {
    setStoredUser(data.user);
  }
  return data;
}

export async function loginUser({ email, password }) {
  const res = await fetch(`${API_AUTH}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(extractErrorMessage(data, 'Invalid email or password.'));
  }

  if (data.token) {
    setToken(data.token);
  }
  if (data.user) {
    setStoredUser(data.user);
  }
  return data;
}

export async function fetchCurrentUser() {
  const res = await authorizedFetch(`${API_AUTH}/me`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(extractErrorMessage(data, 'Failed to fetch user profile.'));
  }
  if (data.data) {
    setStoredUser(data.data);
  }
  return data.data;
}

// ─────────────────────────────────────────────────────────────────────────────
// Task API Endpoints (Protected by JWT)
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchTasks() {
  const res = await authorizedFetch(API_TASKS);
  const data = await res.json();
  if (!res.ok) throw new Error(extractErrorMessage(data, 'Failed to fetch tasks'));
  return data.data;
}

export const getTasks = fetchTasks;

export async function createTask(task) {
  const res = await authorizedFetch(API_TASKS, {
    method: 'POST',
    body: JSON.stringify(task)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(extractErrorMessage(data, 'Failed to create task'));
  return data.data;
}

export async function updateTask(id, updates) {
  const res = await authorizedFetch(`${API_TASKS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(extractErrorMessage(data, 'Failed to update task'));
  return data.data;
}

export async function deleteTask(id) {
  const res = await authorizedFetch(`${API_TASKS}/${id}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(extractErrorMessage(data, 'Failed to delete task'));
  return data;
}
