import { useState, useEffect } from 'react'

function Projects({ darkMode }) {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('https://api.github.com/users/katariyajignesh266/repos')
        if (!response.ok) throw new Error('Failed to fetch repositories')
        const data = await response.json()
        setRepos(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  // Retry function for error handling
  const retryFetch = () => {
    const fetchRepos = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('https://api.github.com/users/katariyajignesh266/repos')
        if (!response.ok) throw new Error('Failed to fetch repositories')
        const data = await response.json()
        setRepos(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }

  // Filter repositories based on search term
  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div style={loadingContainerStyle}>
      <div style={spinnerStyle}></div>
      <p style={loadingTextStyle}>Loading repositories...</p>
    </div>
  )

  // Error Message Component with Retry Button
  const ErrorMessage = ({ message, onRetry }) => (
    <div style={errorContainerStyle}>
      <div style={errorIconStyle}>⚠️</div>
      <h2 style={errorTitleStyle}>Error Loading Repositories</h2>
      <p style={errorMessageStyle}>{message}</p>
      <button onClick={onRetry} style={retryButtonStyle}>
        Retry →
      </button>
    </div>
  )

  // Repository Card Component
  const RepositoryCard = ({ repo }) => (
    <div style={{
      ...repoCardStyle,
      background: darkMode ? '#1a1a2e' : 'white',
      boxShadow: darkMode ? '0 10px 40px rgba(0, 0, 0, 0.3)' : '0 10px 40px rgba(0, 0, 0, 0.08)'
    }}>
      <div style={repoCardHeaderStyle}>
        <span style={tagStyle}>{repo.language || 'Unknown'}</span>
        <div style={starStyle}>
          ⭐ {repo.stargazers_count}
        </div>
      </div>
      <h2 style={{
        ...projectTitleStyle,
        color: darkMode ? '#f0f0f0' : '#1a1a2e'
      }}>{repo.name}</h2>
      <p style={{
        ...descriptionStyle,
        color: darkMode ? '#b0b0c0' : '#4a4a6a'
      }}>
        {repo.description || 'No description available'}
      </p>
      <div style={repoMetaStyle}>
        <span style={metaItemStyle}>
          📅 Updated: {new Date(repo.updated_at).toLocaleDateString()}
        </span>
        <span style={metaItemStyle}>
          🔀 Forks: {repo.forks_count}
        </span>
      </div>
      <a 
        href={repo.html_url} 
        target="_blank" 
        rel="noopener noreferrer"
        style={linkStyle}
      >
        View Repository →
      </a>
    </div>
  )

  // Conditional rendering based on API state
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={retryFetch} />

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

  return (
    <div style={dynamicPageStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={dynamicHeadingStyle}>My GitHub Repositories</h1>
          <div style={dividerStyle}></div>
          <p style={dynamicSubtitleStyle}>
            Explore my open-source projects and contributions on GitHub. 
            These repositories showcase my work in various technologies and domains.
          </p>
        </div>

        {/* Search/Filter Input */}
        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              ...searchStyle,
              background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'white',
              border: darkMode ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid #e5e7eb',
              color: darkMode ? '#f0f0f0' : '#1a1a2e'
            }}
          />
          <div style={{
            ...searchResultsStyle,
            color: darkMode ? '#b0b0c0' : '#6b7280'
          }}>
            {filteredRepos.length} repositories found
          </div>
        </div>

        {/* Repository Grid */}
        <div style={projectsGridStyle}>
          {filteredRepos.length > 0 ? (
            filteredRepos.map((repo) => (
              <RepositoryCard key={repo.id} repo={repo} />
            ))
          ) : (
            <div style={noResultsStyle}>
              <p style={{
                ...noResultsTextStyle,
                color: darkMode ? '#b0b0c0' : '#6b7280'
              }}>No repositories found matching "{searchTerm}"</p>
            </div>
          )}
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
  maxWidth: '1200px',
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
  maxWidth: '700px',
  margin: '0 auto',
  lineHeight: '1.7'
}

// Loading Spinner Styles
const loadingContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  gap: '2rem'
}

const spinnerStyle = {
  width: '60px',
  height: '60px',
  border: '4px solid rgba(102, 126, 234, 0.2)',
  borderTop: '4px solid #667eea',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite'
}

const loadingTextStyle = {
  fontSize: '1.2rem',
  color: '#6b7280',
  fontWeight: '500'
}

// Error Message Styles
const errorContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  gap: '1.5rem',
  textAlign: 'center',
  padding: '2rem'
}

const errorIconStyle = {
  fontSize: '4rem',
  marginBottom: '1rem'
}

const errorTitleStyle = {
  fontSize: '2rem',
  fontWeight: '700',
  color: '#e74c3c',
  marginBottom: '0.5rem'
}

const errorMessageStyle = {
  fontSize: '1.1rem',
  color: '#6b7280',
  maxWidth: '500px',
  lineHeight: '1.6'
}

const retryButtonStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  border: 'none',
  padding: '1rem 2rem',
  borderRadius: '12px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
}

// Search Styles
const searchContainerStyle = {
  maxWidth: '600px',
  margin: '0 auto 3rem',
  textAlign: 'center'
}

const searchStyle = {
  width: '100%',
  padding: '1rem 1.5rem',
  borderRadius: '12px',
  border: '2px solid #e5e7eb',
  fontSize: '1rem',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  outline: 'none'
}

const searchResultsStyle = {
  marginTop: '0.75rem',
  fontSize: '0.9rem',
  color: '#6b7280',
  fontWeight: '500'
}

// Repository Card Styles
const repoCardStyle = {
  background: 'white',
  borderRadius: '20px',
  padding: '2rem',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  flexDirection: 'column'
}

const repoCardHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem'
}

const starStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.9rem',
  color: '#f39c12',
  fontWeight: '600'
}

const repoMetaStyle = {
  display: 'flex',
  gap: '1.5rem',
  marginBottom: '1.5rem',
  flexWrap: 'wrap'
}

const metaItemStyle = {
  fontSize: '0.85rem',
  color: '#6b7280',
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem'
}

// No Results Styles
const noResultsStyle = {
  textAlign: 'center',
  padding: '4rem 2rem',
  gridColumn: '1 / -1'
}

const noResultsTextStyle = {
  fontSize: '1.2rem',
  color: '#6b7280',
  marginBottom: '1rem'
}

const projectsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: '2rem',
  marginBottom: '3rem'
}

const projectTitleStyle = {
  fontSize: '1.8rem',
  fontWeight: '700',
  color: '#1a1a2e',
  marginBottom: '0.75rem'
}

const tagStyle = {
  display: 'inline-block',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: '0.4rem 1rem',
  borderRadius: '20px',
  fontSize: '0.85rem',
  fontWeight: '600'
}

const descriptionStyle = {
  color: '#4a4a6a',
  lineHeight: '1.7',
  marginBottom: '1.5rem',
  fontSize: '1.05rem'
}

const linkStyle = {
  display: 'inline-block',
  marginTop: 'auto',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: '1rem 2rem',
  borderRadius: '12px',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '1rem',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer'
}

export default Projects