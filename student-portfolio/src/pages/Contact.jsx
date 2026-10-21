import { useState } from 'react'

function Contact({ darkMode }) {
  // useState for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  // useState for UI toggle (help tooltip)
  const [showHelp, setShowHelp] = useState(false)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Toggle help tooltip
  const toggleHelp = () => {
    setShowHelp(!showHelp)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thank you ${formData.name}! Your message has been received.`)
    setFormData({ name: '', email: '', message: '' })
  }

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

  const dynamicSubtitleStyle = {
    ...subtitleStyle,
    color: darkMode ? '#b0b0c0' : '#6b7280'
  }

  const dynamicFormSectionStyle = {
    ...formSectionStyle,
    background: darkMode ? '#1a1a2e' : 'white',
    boxShadow: darkMode ? '0 10px 40px rgba(0, 0, 0, 0.3)' : '0 10px 40px rgba(0, 0, 0, 0.08)'
  }

  const dynamicFormTitleStyle = {
    ...formTitleStyle,
    color: darkMode ? '#f0f0f0' : '#1a1a2e'
  }

  const dynamicFormSubtitleStyle = {
    ...formSubtitleStyle,
    color: darkMode ? '#b0b0c0' : '#6b7280'
  }

  const dynamicLabelStyle = {
    ...labelStyle,
    color: darkMode ? '#f0f0f0' : '#1a1a2e'
  }

  const dynamicInputStyle = {
    ...inputStyle,
    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'white',
    border: darkMode ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid #e5e7eb',
    color: darkMode ? '#f0f0f0' : '#1a1a2e'
  }

  const dynamicTextareaStyle = {
    ...textareaStyle,
    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'white',
    border: darkMode ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid #e5e7eb',
    color: darkMode ? '#f0f0f0' : '#1a1a2e'
  }

  const dynamicContactInfoStyle = {
    ...contactInfoStyle,
    background: darkMode ? '#1a1a2e' : 'white',
    boxShadow: darkMode ? '0 10px 40px rgba(0, 0, 0, 0.3)' : '0 10px 40px rgba(0, 0, 0, 0.08)'
  }

  const dynamicContactInfoHeadingStyle = {
    ...contactInfoHeadingStyle,
    color: darkMode ? '#f0f0f0' : '#1a1a2e'
  }

  const dynamicContactCardStyle = {
    ...contactCardStyle,
    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#f8f9fa'
  }

  const dynamicContactInfoTextStyle = {
    ...contactInfoTextStyle,
    color: darkMode ? '#b0b0c0' : '#4a4a6a'
  }

  return (
    <div style={dynamicPageStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={dynamicHeadingStyle}>Get In Touch</h1>
          <div style={dividerStyle}></div>
          <p style={dynamicSubtitleStyle}>
            Have a question or want to work together? Send me a message!
          </p>
        </div>

        <div style={formContainerStyle} className="contact-form-container">
          <div style={dynamicFormSectionStyle}>
            <div style={formHeaderStyle}>
              <h2 style={dynamicFormTitleStyle}>Send a Message</h2>
              <p style={dynamicFormSubtitleStyle}>Fill out the form below and I'll get back to you as soon as possible.</p>
            </div>
            
            <form onSubmit={handleSubmit} style={formStyle}>
              <div style={formGroupStyle}>
                <label style={dynamicLabelStyle}>
                  Name
                  <button 
                    type="button"
                    onClick={toggleHelp}
                    style={helpButtonStyle}
                    onMouseEnter={() => setShowHelp(true)}
                    onMouseLeave={() => setShowHelp(false)}
                  >
                    ?
                  </button>
                  {showHelp && (
                    <span style={tooltipStyle}>
                      Enter your full name for proper identification
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  style={dynamicInputStyle}
                />
              </div>

              <div style={formGroupStyle}>
                <label style={dynamicLabelStyle}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  style={dynamicInputStyle}
                />
              </div>

              <div style={formGroupStyle}>
                <label style={dynamicLabelStyle}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  required
                  rows="6"
                  style={dynamicTextareaStyle}
                />
                <div style={charCountStyle}>
                  {formData.message.length} characters
                </div>
              </div>

              <button type="submit" style={submitStyle}>
                Send Message →
              </button>
            </form>
          </div>

          <div style={previewSectionStyle}>
            <div style={previewHeaderStyle}>
              <h2 style={previewTitleStyle}>Live Preview</h2>
              <p style={previewSubtitleStyle}>See your message in real-time</p>
            </div>
            <div style={previewContentStyle}>
              <div style={previewItemStyle}>
                <span style={previewLabelStyle}>Name:</span>
                <span style={previewValueStyle}>{formData.name || 'Not provided'}</span>
              </div>
              <div style={previewItemStyle}>
                <span style={previewLabelStyle}>Email:</span>
                <span style={previewValueStyle}>{formData.email || 'Not provided'}</span>
              </div>
              <div style={previewItemStyle}>
                <span style={previewLabelStyle}>Message:</span>
              </div>
              <div style={messagePreviewStyle}>
                {formData.message || 'No message yet...'}
              </div>
            </div>
          </div>
        </div>

        <div style={dynamicContactInfoStyle}>
          <h3 style={dynamicContactInfoHeadingStyle}>Other Ways to Connect</h3>
          <div style={contactCardsStyle}>
            <div style={dynamicContactCardStyle}>
              <div style={contactIconStyle}>📧</div>
              <div style={dynamicContactInfoTextStyle}>
                <strong>Email</strong>
                <p style={contactInfoTextPStyle}>23DCE056@charusat.edu.in</p>
              </div>
            </div>
            <div style={dynamicContactCardStyle}>
              <div style={contactIconStyle}>📱</div>
              <div style={dynamicContactInfoTextStyle}>
                <strong>Phone</strong>
                <p style={contactInfoTextPStyle}>+91 7698496096</p>
              </div>
            </div>
            <div style={dynamicContactCardStyle}>
              <div style={contactIconStyle}>📍</div>
              <div style={dynamicContactInfoTextStyle}>
                <strong>Location</strong>
                <p style={contactInfoTextPStyle}>Rajula, Amreli, Gujarat, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const pageStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
  paddingTop: '6rem'
}

const containerStyle = {
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '2rem'
}

const headerStyle = {
  textAlign: 'center',
  marginBottom: '4rem'
}

const headingStyle = {
  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
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
  margin: '0 auto',
  lineHeight: '1.7'
}

const formContainerStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '2rem',
  marginBottom: '4rem'
}

const formSectionStyle = {
  background: 'white',
  borderRadius: '24px',
  padding: '2.5rem',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
}

const formHeaderStyle = {
  marginBottom: '2rem'
}

const formTitleStyle = {
  fontSize: '1.8rem',
  fontWeight: '700',
  color: '#1a1a2e',
  marginBottom: '0.5rem'
}

const formSubtitleStyle = {
  fontSize: '1rem',
  color: '#6b7280',
  lineHeight: '1.6'
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
}

const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
}

const labelStyle = {
  fontSize: '1rem',
  fontWeight: '600',
  color: '#1a1a2e',
  position: 'relative'
}

const helpButtonStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  width: '24px',
  height: '24px',
  cursor: 'pointer',
  marginLeft: '0.5rem',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  transition: 'all 0.2s ease'
}

const tooltipStyle = {
  position: 'absolute',
  top: '-35px',
  left: '0',
  background: '#1a1a2e',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  fontSize: '0.85rem',
  whiteSpace: 'nowrap',
  zIndex: 10,
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
}

const inputStyle = {
  width: '100%',
  padding: '1rem',
  border: '2px solid #e5e7eb',
  borderRadius: '12px',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  outline: 'none'
}

const textareaStyle = {
  width: '100%',
  padding: '1rem',
  border: '2px solid #e5e7eb',
  borderRadius: '12px',
  fontSize: '1rem',
  fontFamily: 'inherit',
  resize: 'vertical',
  transition: 'all 0.3s ease',
  outline: 'none'
}

const charCountStyle = {
  textAlign: 'right',
  fontSize: '0.85rem',
  color: '#9ca3af',
  marginTop: '0.25rem'
}

const submitStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: '1.25rem 2rem',
  border: 'none',
  borderRadius: '12px',
  fontSize: '1.1rem',
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
}

const previewSectionStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '24px',
  padding: '2.5rem',
  boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)'
}

const previewHeaderStyle = {
  marginBottom: '2rem',
  color: 'white'
}

const previewTitleStyle = {
  fontSize: '1.8rem',
  fontWeight: '700',
  marginBottom: '0.5rem'
}

const previewSubtitleStyle = {
  fontSize: '1rem',
  opacity: 0.9
}

const previewContentStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  padding: '2rem',
  color: 'white'
}

const previewItemStyle = {
  marginBottom: '1rem',
  display: 'flex',
  gap: '0.5rem'
}

const previewLabelStyle = {
  fontWeight: '600',
  opacity: 0.9
}

const previewValueStyle = {
  opacity: 0.95
}

const messagePreviewStyle = {
  background: 'rgba(255, 255, 255, 0.15)',
  padding: '1.5rem',
  borderRadius: '12px',
  minHeight: '120px',
  fontStyle: 'italic',
  opacity: 0.95,
  lineHeight: '1.6'
}

const contactInfoStyle = {
  background: 'white',
  borderRadius: '24px',
  padding: '3rem',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
  textAlign: 'center'
}

const contactInfoHeadingStyle = {
  fontSize: '2rem',
  fontWeight: '700',
  color: '#1a1a2e',
  marginBottom: '2rem'
}

const contactCardsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1.5rem'
}

const contactCardStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '1.5rem',
  background: '#f8f9fa',
  borderRadius: '16px',
  textAlign: 'left'
}

const contactIconStyle = {
  fontSize: '2rem',
  flexShrink: 0
}

const contactInfoTextStyle = {
  textAlign: 'left',
  color: '#4a4a6a'
}

const contactInfoTextPStyle = {
  margin: '0.25rem 0 0',
  fontSize: '0.95rem'
}

export default Contact