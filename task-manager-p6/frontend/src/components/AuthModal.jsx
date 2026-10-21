import React, { useState } from 'react';
import { loginUser, registerUser } from '../api';

function AuthModal({ onAuthSuccess, showToast }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!email.trim() || !password) {
      setFormError('Email and password are both required.');
      return;
    }
    if (mode === 'register' && password.length < 6) {
      setFormError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      if (mode === 'login') {
        const res = await loginUser({ email: email.trim(), password });
        showToast('Welcome back!', 'success');
        onAuthSuccess(res.user, res.token);
      } else {
        const res = await registerUser({ email: email.trim(), password });
        showToast('Account created successfully!', 'success');
        onAuthSuccess(res.user, res.token);
      }
    } catch (err) {
      setFormError(err.message || 'Authentication failed');
      showToast(err.message || 'Authentication failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-fullscreen">
      <div className="auth-left-panel">
        <div className="auth-left-content">
          <div className="auth-brand">
            <div className="auth-brand-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <span className="auth-brand-name">TaskFlow</span>
          </div>
          <h1 className="auth-left-title">Manage your tasks<br/>with confidence.</h1>
          <p className="auth-left-desc">
            A full-stack task manager powered by React 18, Express, and MongoDB with JWT authentication and real-time analytics.
          </p>
          <div className="auth-feature-list">
            <div className="auth-feature-item">
              <span className="auth-feature-icon">🔐</span>
              <span>JWT + bcrypt secure authentication</span>
            </div>
            <div className="auth-feature-item">
              <span className="auth-feature-icon">⚡</span>
              <span>Route-based lazy loading & code splitting</span>
            </div>
            <div className="auth-feature-item">
              <span className="auth-feature-icon">📊</span>
              <span>Real-time productivity analytics</span>
            </div>
            <div className="auth-feature-item">
              <span className="auth-feature-icon">💾</span>
              <span>Persistent storage in MongoDB Atlas</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right-panel">
        <div className="auth-card">
          <div className="auth-card-header">
            <h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
            <p>{mode === 'login' ? 'Sign in to your account to continue.' : 'Get started in less than a minute.'}</p>
          </div>

          <div className="auth-tabs">
            <button
              type="button"
              className={`tab-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => { setMode('login'); setFormError(''); }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`tab-btn ${mode === 'register' ? 'active' : ''}`}
              onClick={() => { setMode('register'); setFormError(''); }}
            >
              Register
            </button>
          </div>

          {formError && (
            <div className="auth-error-alert" role="alert">
              <span>⚠ {formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="form-group">
              <label htmlFor="auth-email">Email Address</label>
              <input
                id="auth-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="auth-password">Password</label>
              <div className="password-input-wrapper">
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={mode === 'register' ? 'At least 6 characters' : '••••••••'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {mode === 'register' && (
                <small className="field-hint">Must be at least 6 characters.</small>
              )}
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="btn-spinner-text">Processing...</span>
              ) : mode === 'login' ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="auth-footer-help">
            <p>
              {mode === 'login' ? (
                <>Don't have an account? <button type="button" className="auth-switch-btn" onClick={() => { setMode('register'); setFormError(''); }}>Register</button></>
              ) : (
                <>Already have an account? <button type="button" className="auth-switch-btn" onClick={() => { setMode('login'); setFormError(''); }}>Sign In</button></>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
