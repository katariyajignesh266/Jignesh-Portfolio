import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Apply theme class to root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
  }, [darkMode])

  return (
    <div className="app">
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route path="/projects" element={<Projects darkMode={darkMode} />} />
        <Route path="/contact" element={<Contact darkMode={darkMode} />} />
        <Route path="*" element={<NotFound darkMode={darkMode} />} />
      </Routes>
      <Footer darkMode={darkMode} />
    </div>
  )
}

export default App
