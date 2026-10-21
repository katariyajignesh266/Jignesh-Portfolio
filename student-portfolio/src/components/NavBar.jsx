import { Link, useLocation } from 'react-router-dom'

function NavBar({ darkMode, toggleDarkMode }) {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navStyle = {
    background: darkMode ? 'rgba(26, 26, 46, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '1rem 2rem',
    boxShadow: darkMode ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease'
  }

  const linkStyle = {
    color: darkMode ? '#b0b0c0' : '#4a4a6a',
    textDecoration: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative'
  }

  const activeLinkStyle = {
    color: '#667eea',
    background: darkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.1)',
    fontWeight: '600'
  }

  const themeToggleStyle = {
    background: darkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.1)',
    border: 'none',
    borderRadius: '10px',
    padding: '0.75rem 1rem',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          <span style={logoTextStyle}>JK</span>
        </Link>
        <div style={linksStyle}>
          <Link 
            to="/" 
            style={{...linkStyle, ...(isActive('/') ? activeLinkStyle : {})}}
          >
            Home
          </Link>
          <Link 
            to="/projects" 
            style={{...linkStyle, ...(isActive('/projects') ? activeLinkStyle : {})}}
          >
            Projects
          </Link>
          <Link 
            to="/contact" 
            style={{...linkStyle, ...(isActive('/contact') ? activeLinkStyle : {})}}
          >
            Contact
          </Link>
          <button 
            onClick={toggleDarkMode} 
            style={themeToggleStyle}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  )
}

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const logoStyle = {
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '12px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  alignItems: 'center'
}

const logoTextStyle = {
  fontSize: '1.8rem',
  fontWeight: '800',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent'
}

const linksStyle = {
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center'
}

export default NavBar