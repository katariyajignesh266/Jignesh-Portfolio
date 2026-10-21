function Header({ name }) {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>Student Portfolio</h1>
      <h2 style={nameStyle}>{name}</h2>
      <p style={subtitleStyle}>Computer Engineering Student | Full Stack Developer</p>
    </header>
  );
}

const headerStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: '3rem 2rem',
  textAlign: 'center',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '0 0 20px 20px',
  marginTop: '0'
};

const titleStyle = {
  margin: '0 0 1rem 0',
  fontSize: '2.5rem',
  fontWeight: 'bold'
};

const nameStyle = {
  margin: '0 0 0.5rem 0',
  fontSize: '1.8rem',
  fontWeight: '600'
};

const subtitleStyle = {
  margin: '0',
  fontSize: '1.1rem',
  opacity: '0.9'
};

export default Header;
