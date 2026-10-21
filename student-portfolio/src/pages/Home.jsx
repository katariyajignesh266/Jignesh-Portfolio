import { Link } from 'react-router-dom'
import About from '../components/About'
import Skills from '../components/Skills'

function Home({ darkMode }) {
  const dynamicHomeStyle = {
    ...homeStyle,
    background: darkMode 
      ? 'linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%)' 
      : 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)'
  }

  const dynamicHeroStyle = {
    ...heroStyle,
    background: darkMode 
      ? 'linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%)' 
      : 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)'
  }

  const dynamicHeroTitleStyle = {
    ...heroTitleStyle,
    color: darkMode ? '#f0f0f0' : '#1a1a2e'
  }

  const dynamicHeroDescriptionStyle = {
    ...heroDescriptionStyle,
    color: darkMode ? '#b0b0c0' : '#4a4a6a'
  }

  return (
    <div style={dynamicHomeStyle}>
      {/* Hero Section */}
      <section style={dynamicHeroStyle}>
        <div style={heroContentStyle}>
          <p style={heroSubtitleStyle}>Hello! I Am</p>
          <h1 style={heroNameStyle}>Jignesh Katariya</h1>
          <h2 style={dynamicHeroTitleStyle}>
            Computer Engineering Student | Full Stack Developer
          </h2>
          <p style={dynamicHeroDescriptionStyle}>
            I'm a passionate developer building real-world applications that solve practical problems. 
            My focus is on creating scalable, responsive, and user-friendly software using 
            Python-based backend technologies and modern frontend frameworks.
          </p>
          <div style={ctaButtonsStyle}>
            <Link to="/projects" style={primaryButtonStyle}>
              View My Work
            </Link>
            <Link to="/contact" style={secondaryButtonStyle}>
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      <About darkMode={darkMode} />
      <Skills darkMode={darkMode} />
    </div>
  )
}

const homeStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)',
  paddingTop: '80px',
  transition: 'background 0.3s ease'
}

const heroStyle = {
  minHeight: '90vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4rem 2rem',
  background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
  position: 'relative',
  overflow: 'hidden'
}

const heroContentStyle = {
  maxWidth: '900px',
  textAlign: 'center',
  zIndex: 1
}

const heroSubtitleStyle = {
  fontSize: '1.5rem',
  color: '#667eea',
  fontWeight: '600',
  marginBottom: '1rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase'
}

const heroNameStyle = {
  fontSize: 'clamp(3rem, 8vw, 6rem)',
  fontWeight: '800',
  marginBottom: '1.5rem',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
  lineHeight: '1.1',
  letterSpacing: '-0.02em'
}

const heroTitleStyle = {
  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
  fontWeight: '700',
  color: '#1a1a2e',
  marginBottom: '2rem',
  lineHeight: '1.3'
}

const heroDescriptionStyle = {
  fontSize: '1.25rem',
  color: '#4a4a6a',
  lineHeight: '1.8',
  marginBottom: '3rem',
  maxWidth: '700px',
  margin: '0 auto 3rem'
}

const ctaButtonsStyle = {
  display: 'flex',
  gap: '1.5rem',
  justifyContent: 'center',
  flexWrap: 'wrap'
}

const primaryButtonStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: '1.25rem 2.5rem',
  borderRadius: '12px',
  fontSize: '1.1rem',
  fontWeight: '600',
  textDecoration: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  border: 'none',
  cursor: 'pointer'
}

const secondaryButtonStyle = {
  background: 'transparent',
  color: '#667eea',
  padding: '1.25rem 2.5rem',
  borderRadius: '12px',
  fontSize: '1.1rem',
  fontWeight: '600',
  textDecoration: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '2px solid #667eea',
  cursor: 'pointer'
}

const primaryButtonHoverStyle = {
  transform: 'translateY(-2px)',
  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
}

const secondaryButtonHoverStyle = {
  background: 'rgba(102, 126, 234, 0.1)',
  transform: 'translateY(-2px)'
}

export default Home