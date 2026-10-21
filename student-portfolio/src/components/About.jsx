function About({ darkMode }) {
  const dynamicSectionStyle = {
    ...sectionStyle,
    background: darkMode 
      ? 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)' 
      : 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)'
  }

  const dynamicHeadingStyle = {
    ...headingStyle,
    color: darkMode ? '#f0f0f0' : '#1a1a2e'
  }

  const dynamicIntroCardStyle = {
    ...introCardStyle,
    background: darkMode ? '#1a1a2e' : 'white',
    boxShadow: darkMode ? '0 10px 40px rgba(0, 0, 0, 0.3)' : '0 10px 40px rgba(0, 0, 0, 0.08)'
  }

  const dynamicIntroTextStyle = {
    ...introTextStyle,
    color: darkMode ? '#b0b0c0' : '#4a4a6a'
  }

  const dynamicInfoCardStyle = {
    ...infoCardStyle,
    background: darkMode ? '#1a1a2e' : 'white',
    boxShadow: darkMode ? '0 8px 30px rgba(0, 0, 0, 0.3)' : '0 8px 30px rgba(0, 0, 0, 0.06)'
  }

  const dynamicCardTitleStyle = {
    ...cardTitleStyle,
    color: darkMode ? '#f0f0f0' : '#1a1a2e'
  }

  const dynamicCardTextStyle = {
    ...cardTextStyle,
    color: darkMode ? '#b0b0c0' : '#4a4a6a'
  }

  const dynamicPhilosophyCardStyle = {
    ...philosophyCardStyle,
    background: darkMode 
      ? 'linear-gradient(135deg, #4a4a6a 0%, #3a3a5a 100%)' 
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: darkMode ? '0 15px 50px rgba(0, 0, 0, 0.4)' : '0 15px 50px rgba(102, 126, 234, 0.3)'
  }

  return (
    <section style={dynamicSectionStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={dynamicHeadingStyle}>About Me</h2>
          <div style={dividerStyle}></div>
        </div>
        
        <div style={contentStyle}>
          <div style={dynamicIntroCardStyle}>
            <p style={dynamicIntroTextStyle}>
              I am a Computer Engineering student passionate about <span style={highlightStyle}>Full Stack Development</span>, 
              <span style={highlightStyle}> Backend Engineering</span>, <span style={highlightStyle}>Artificial Intelligence</span>, 
              and <span style={highlightStyle}>Machine Learning</span>.
            </p>
          </div>

          <div style={gridStyle}>
            <div style={dynamicInfoCardStyle}>
              <h3 style={dynamicCardTitleStyle}>What I Do</h3>
              <p style={dynamicCardTextStyle}>
                I enjoy designing and building real-world applications that solve practical problems. 
                My focus is on creating scalable, responsive, and user-friendly software using 
                Python-based backend technologies and modern frontend frameworks.
              </p>
            </div>

            <div style={dynamicInfoCardStyle}>
              <h3 style={dynamicCardTitleStyle}>My Goals</h3>
              <p style={dynamicCardTextStyle}>
                I continuously learn new technologies and enjoy working on challenging projects 
                involving AI, APIs, cloud services, and automation. My long-term goal is to become 
                an AI Engineer and Full Stack Software Developer capable of building intelligent 
                products used by thousands of users.
              </p>
            </div>
          </div>

          <div style={dynamicPhilosophyCardStyle}>
            <h3 style={philosophyTitleStyle}>My Philosophy</h3>
            <p style={philosophyTextStyle}>
              "The best way to predict the future is to create it." I believe in continuous learning, 
              practical application of knowledge, and building solutions that make a real difference 
              in people's lives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const sectionStyle = {
  padding: '6rem 2rem',
  background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)'
}

const containerStyle = {
  maxWidth: '1000px',
  margin: '0 auto'
}

const headerStyle = {
  textAlign: 'center',
  marginBottom: '4rem'
}

const headingStyle = {
  fontSize: 'clamp(2rem, 5vw, 3rem)',
  fontWeight: '800',
  color: '#1a1a2e',
  marginBottom: '1.5rem',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent'
}

const dividerStyle = {
  width: '80px',
  height: '4px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  margin: '0 auto',
  borderRadius: '2px'
}

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem'
}

const introCardStyle = {
  background: 'white',
  padding: '2.5rem',
  borderRadius: '20px',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
  textAlign: 'center'
}

const introTextStyle = {
  fontSize: '1.3rem',
  lineHeight: '1.8',
  color: '#4a4a6a',
  fontWeight: '500'
}

const highlightStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
  fontWeight: '700'
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '2rem'
}

const infoCardStyle = {
  background: 'white',
  padding: '2rem',
  borderRadius: '16px',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
}

const cardTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: '700',
  color: '#1a1a2e',
  marginBottom: '1rem'
}

const cardTextStyle = {
  fontSize: '1.1rem',
  lineHeight: '1.7',
  color: '#4a4a6a'
}

const philosophyCardStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '2.5rem',
  borderRadius: '20px',
  boxShadow: '0 15px 50px rgba(102, 126, 234, 0.3)',
  textAlign: 'center'
}

const philosophyTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: '700',
  color: 'white',
  marginBottom: '1rem'
}

const philosophyTextStyle = {
  fontSize: '1.2rem',
  lineHeight: '1.8',
  color: 'rgba(255, 255, 255, 0.95)',
  fontStyle: 'italic'
}

export default About;
