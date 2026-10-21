import { Link } from 'react-router-dom'

function NotFound({ darkMode }) {
  const dynamicPageStyle = {
    ...pageStyle,
    background: darkMode 
      ? 'linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%)' 
      : 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)'
  }

  const dynamicHeadingStyle = {
    ...headingStyle,
    color: darkMode ? '#f0f0f0' : '#1a1a2e'
  }

  const dynamicMessageStyle = {
    ...messageStyle,
    color: darkMode ? '#b0b0c0' : '#6b7280'
  }

  const dynamicLinkStyle = {
    ...linkStyle,
    boxShadow: darkMode ? '0 4px 15px rgba(102, 126, 234, 0.4)' : '0 4px 15px rgba(102, 126, 234, 0.3)'
  }

  return (
    <div style={dynamicPageStyle}>
      <div style={containerStyle}>
        <h1 style={errorCodeStyle}>404</h1>
        <h2 style={dynamicHeadingStyle}>Page Not Found</h2>
        <p style={dynamicMessageStyle}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" style={dynamicLinkStyle}>
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

const pageStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '80px'
}

const containerStyle = {
  textAlign: 'center',
  padding: '2rem'
}

const errorCodeStyle = {
  fontSize: 'clamp(6rem, 15vw, 10rem)',
  fontWeight: '800',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
  margin: '0 0 1rem 0',
  lineHeight: '1'
}

const headingStyle = {
  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
  fontWeight: '700',
  color: '#1a1a2e',
  marginBottom: '1rem'
}

const messageStyle = {
  fontSize: '1.2rem',
  color: '#6b7280',
  marginBottom: '2.5rem',
  maxWidth: '500px',
  margin: '0 auto 2.5rem',
  lineHeight: '1.6'
}

const linkStyle = {
  display: 'inline-block',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: '1.25rem 2.5rem',
  borderRadius: '12px',
  textDecoration: 'none',
  fontSize: '1.1rem',
  fontWeight: '600',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
}

export default NotFound