function Footer({ darkMode }) {
  const dynamicFooterStyle = {
    ...footerStyle,
    background: darkMode ? '#0f0f1a' : '#1a1a2e',
    borderTop: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
  }

  const dynamicTaglineStyle = {
    ...taglineStyle,
    color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.7)'
  }

  const dynamicCopyrightStyle = {
    ...copyrightStyle,
    borderTop: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)',
    color: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.5)'
  }

  return (
    <footer style={dynamicFooterStyle}>
      <div style={containerStyle}>
        <div style={contentStyle}>
          <div style={logoStyle}>
            <span style={logoTextStyle}>JK</span>
          </div>
          <p style={dynamicTaglineStyle}>
            Building the future through code and creativity
          </p>
          <div style={socialStyle}>
            <a 
              href="https://github.com/katariyajignesh266" 
              target="_blank" 
              rel="noopener noreferrer"
              style={socialLinkStyle}
              aria-label="GitHub"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/katariya-jignesh-4324a3290/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={socialLinkStyle}
              aria-label="LinkedIn"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              href="mailto:23DCE056@charusat.edu.in"
              style={socialLinkStyle}
              aria-label="Email"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-11.174l4.623 5.462zm5.377 2.738l-5.404-6.379-5.404 6.379h10.808zm-6.6-1.416l-5.8-6.968h16.6l-5.8 6.968zm5.4 1.416l5.4-6.379-5.404-6.379 5.404 6.379zm-4.623-7.929l4.623-5.462v11.174l-4.623-5.712z"/>
              </svg>
            </a>
          </div>
        </div>
        <div style={dynamicCopyrightStyle}>
          <p>&copy; 2026 Jignesh Katariya. Crafted with passion and code.</p>
        </div>
      </div>
    </footer>
  );
}

const footerStyle = {
  background: '#1a1a2e',
  color: 'white',
  padding: '4rem 2rem 2rem',
  marginTop: '4rem'
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto'
};

const contentStyle = {
  textAlign: 'center',
  marginBottom: '3rem'
};

const logoStyle = {
  display: 'inline-block',
  marginBottom: '1.5rem'
};

const logoTextStyle = {
  fontSize: '2.5rem',
  fontWeight: '800',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent'
};

const taglineStyle = {
  fontSize: '1.2rem',
  color: 'rgba(255, 255, 255, 0.7)',
  marginBottom: '2rem',
  maxWidth: '500px',
  margin: '0 auto 2rem',
  lineHeight: '1.6'
};

const socialStyle = {
  display: 'flex',
  gap: '1.5rem',
  justifyContent: 'center',
  alignItems: 'center'
};

const socialLinkStyle = {
  color: 'rgba(255, 255, 255, 0.7)',
  textDecoration: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const copyrightStyle = {
  textAlign: 'center',
  paddingTop: '2rem',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  fontSize: '0.9rem',
  color: 'rgba(255, 255, 255, 0.5)'
};

export default Footer;
