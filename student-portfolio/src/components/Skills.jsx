function Skills({ darkMode }) {
  const skillCategories = {
    "Languages": ["Python", "JavaScript", "C", "HTML5", "CSS3"],
    "Frontend": ["React", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
    "Backend": ["Python", "FastAPI", "Django", "REST API Development"],
    "Database": ["MySQL", "SQLite", "PostgreSQL"],
    "Cloud & Tools": ["AWS S3", "Git", "GitHub", "VS Code", "PyCharm", "npm", "Vite"]
  }

  const dynamicSectionStyle = {
    ...sectionStyle,
    background: darkMode 
      ? 'linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%)' 
      : 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)'
  }

  const dynamicHeadingStyle = {
    ...headingStyle,
    color: darkMode ? '#f0f0f0' : '#1a1a2e'
  }

  const dynamicSubtitleStyle = {
    ...subtitleStyle,
    color: darkMode ? '#b0b0c0' : '#6b7280'
  }

  const dynamicCategoryCardStyle = {
    ...categoryCardStyle,
    background: darkMode ? '#1a1a2e' : 'white',
    boxShadow: darkMode ? '0 10px 40px rgba(0, 0, 0, 0.3)' : '0 10px 40px rgba(0, 0, 0, 0.08)'
  }

  const dynamicCategoryTitleStyle = {
    ...categoryTitleStyle,
    color: darkMode ? '#f0f0f0' : '#1a1a2e',
    borderBottom: darkMode ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid #f0f0f0'
  }

  const dynamicSkillItemStyle = {
    ...skillItemStyle,
    color: darkMode ? '#b0b0c0' : '#4a4a6a'
  }

  const dynamicFeaturedSkillsStyle = {
    ...featuredSkillsStyle,
    background: darkMode 
      ? 'linear-gradient(135deg, #4a4a6a 0%, #3a3a5a 100%)' 
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: darkMode ? '0 20px 60px rgba(0, 0, 0, 0.4)' : '0 20px 60px rgba(102, 126, 234, 0.3)'
  }

  return (
    <section style={dynamicSectionStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={dynamicHeadingStyle}>Technical Skills</h2>
          <div style={dividerStyle}></div>
          <p style={dynamicSubtitleStyle}>
            A comprehensive toolkit of technologies and frameworks I use to build modern applications
          </p>
        </div>

        <div style={skillsGridStyle}>
          {Object.entries(skillCategories).map(([category, skills]) => (
            <div key={category} style={dynamicCategoryCardStyle}>
              <h3 style={dynamicCategoryTitleStyle}>{category}</h3>
              <div style={skillsListStyle}>
                {skills.map((skill) => (
                  <div key={skill} style={dynamicSkillItemStyle}>
                    <span style={skillDotStyle}></span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={dynamicFeaturedSkillsStyle}>
          <h3 style={featuredTitleStyle}>Featured Expertise</h3>
          <div style={featuredGridStyle}>
            {["Python Development", "React.js", "FastAPI", "REST APIs", "Full Stack Development"].map((skill) => (
              <div key={skill} style={featuredSkillStyle}>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const sectionStyle = {
  padding: '6rem 2rem',
  background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)'
}

const containerStyle = {
  maxWidth: '1200px',
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
  margin: '0 auto 1.5rem',
  borderRadius: '2px'
}

const subtitleStyle = {
  fontSize: '1.2rem',
  color: '#6b7280',
  maxWidth: '600px',
  margin: '0 auto'
}

const skillsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '2rem',
  marginBottom: '4rem'
}

const categoryCardStyle = {
  background: 'white',
  padding: '2rem',
  borderRadius: '20px',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
}

const categoryTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: '700',
  color: '#1a1a2e',
  marginBottom: '1.5rem',
  paddingBottom: '1rem',
  borderBottom: '2px solid #f0f0f0'
}

const skillsListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
}

const skillItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  fontSize: '1rem',
  color: '#4a4a6a',
  padding: '0.5rem',
  borderRadius: '8px',
  transition: 'all 0.2s ease'
}

const skillDotStyle = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  flexShrink: 0
}

const featuredSkillsStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '3rem',
  borderRadius: '24px',
  boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)'
}

const featuredTitleStyle = {
  fontSize: '1.8rem',
  fontWeight: '700',
  color: 'white',
  marginBottom: '2rem',
  textAlign: 'center'
}

const featuredGridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  justifyContent: 'center'
}

const featuredSkillStyle = {
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  padding: '1rem 2rem',
  borderRadius: '30px',
  color: 'white',
  fontSize: '1.1rem',
  fontWeight: '600',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease'
}

export default Skills;
