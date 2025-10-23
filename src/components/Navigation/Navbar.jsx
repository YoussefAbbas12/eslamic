import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'الرئيسية', icon: '🏠' },
    { path: '/today', label: 'اليوم', icon: '📅' },
    { path: '/quran', label: 'القرآن الكريم', icon: '📖' },
    { path: '/quran-search', label: 'بحث القرآن', icon: '🔍' },
    { path: '/hadith', label: 'الأحاديث', icon: '📚' },
    { path: '/duas', label: 'الأدعية', icon: '🤲' },
    { path: '/prayer-times', label: 'مواقيت الصلاة', icon: '🕌' },
    { path: '/tasbih', label: 'التسبيح', icon: '📿' },
    { path: '/allah-names', label: 'أسماء الله', icon: '✨' },
    { path: '/islamic-rulings', label: 'الأحكام الشرعية', icon: '⚖️' },
    { path: '/quiz', label: 'الاختبار', icon: '🎯' },
    { path: '/khatmah', label: 'الختمة', icon: '🕋' },
    { path: '/stats', label: 'إحصائياتي', icon: '📊' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">☪️</span>
          <span className="logo-text">موقعنا الإسلامي</span>
        </Link>

        <button 
          className="navbar-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isOpen ? 'open' : ''}`}></span>
        </button>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="nav-icon">{link.icon}</span>
                  <span className="nav-label">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className="theme-icon">{isDark ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
