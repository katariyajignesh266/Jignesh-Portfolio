import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ user, onOpenProfile, onLogout }) {
  const avatarLetter = user?.email?.charAt(0).toUpperCase() || '?';

  return (
    <header className="main-navbar">
      <div className="navbar-container">

        <div className="navbar-brand">
          <div className="brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-name">TaskFlow</span>
          </div>
        </div>

        <nav className="navbar-links" aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <span className="nav-icon">📋</span>
            <span>Tasks</span>
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <span className="nav-icon">🚀</span>
            <span>Projects</span>
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <span className="nav-icon">📊</span>
            <span>Analytics</span>
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <span className="nav-icon">💬</span>
            <span>Contact</span>
          </NavLink>
        </nav>

        <div className="navbar-user">
          <button
            type="button"
            className="user-profile-btn"
            onClick={onOpenProfile}
            title="View User Profile"
          >
            <span className="user-avatar-circle">{avatarLetter}</span>
            <span className="user-email-text">{user?.email}</span>
          </button>
          <button
            type="button"
            className="btn-nav-logout"
            onClick={onLogout}
            title="Sign Out"
          >
            Sign Out
          </button>
        </div>

      </div>
    </header>
  );
}

export default React.memo(Navbar);
