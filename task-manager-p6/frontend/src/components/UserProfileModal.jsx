import React, { useState, useEffect } from 'react';
import { fetchCurrentUser } from '../api';

function UserProfileModal({ isOpen, onClose, showToast }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError('');
      fetchCurrentUser()
        .then((data) => setProfile(data))
        .catch((err) => {
          setError(err.message || 'Failed to fetch /me endpoint');
          showToast(err.message || 'Failed to fetch profile', 'error');
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, showToast]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-box profile-modal-box"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
      >
        <div className="modal-header">
          <h3 id="profile-title">Logged-in User (/api/auth/me)</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <div className="modal-body">
          <p className="profile-desc">
            This data is fetched dynamically from the protected <code>GET /api/auth/me</code> route, which verifies the decoded JWT payload.
          </p>

          {loading && <p className="status-text">Fetching user details...</p>}
          {error && <p className="error-text">{error}</p>}

          {profile && (
            <div className="profile-details-card">
              <div className="profile-row">
                <span className="profile-label">User ID (_id):</span>
                <code className="profile-value">{profile._id}</code>
              </div>
              <div className="profile-row">
                <span className="profile-label">Email:</span>
                <span className="profile-value font-bold">{profile.email}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Member Since:</span>
                <span className="profile-value">
                  {profile.createdAt ? new Date(profile.createdAt).toLocaleString() : 'N/A'}
                </span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Password Hash:</span>
                <span className="profile-value text-muted">[Excluded from response]</span>
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfileModal;
