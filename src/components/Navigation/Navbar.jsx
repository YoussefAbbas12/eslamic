import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const NAV_LINKS = [
  { path: '/',       label: 'الرئيسية' },
  { path: '/today',  label: 'اليوم' },
  { path: '/quran',  label: 'القرآن الكريم' },
  { path: '/hadith', label: 'الأحاديث' },
  { path: '/duas',   label: 'الأدعية' },
];

function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location                = useLocation();

  const isActive   = (path) => location.pathname === path;
  const closeMenu  = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <header className="nb-header" role="banner">
      <nav className="nb-nav" aria-label="القائمة الرئيسية">
        <div className="nb-container">

          {/* ── Logo ── */}
          <Link to="/" className="nb-logo" aria-label="الصفحة الرئيسية — موقعنا الإسلامي">
            <span className="nb-logo-text">موقعنا الإسلامي</span>
          </Link>

          {/* ── Desktop nav links ── */}
          <ul className="nb-links" role="list">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.path);
              return (
                <li key={link.path} role="listitem">
                  <Link
                    to={link.path}
                    className={`nb-link ${active ? 'nb-link--active' : ''}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Right-side controls ── */}
          <div className="nb-controls">
            {/* Dark / Light toggle */}
            <button
              className="nb-theme-btn"
              onClick={toggleTheme}
              aria-label={isDark ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
              aria-pressed={isDark}
            >
              <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
            </button>

            {/* Mobile hamburger */}
            <button
              className={`nb-hamburger ${isOpen ? 'nb-hamburger--open' : ''}`}
              onClick={toggleMenu}
              aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={isOpen}
              aria-controls="nb-mobile-menu"
            >
              <span className="nb-bar" aria-hidden="true" />
              <span className="nb-bar" aria-hidden="true" />
              <span className="nb-bar" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ── Mobile menu drawer ── */}
        <div
          id="nb-mobile-menu"
          className={`nb-drawer ${isOpen ? 'nb-drawer--open' : ''}`}
          aria-hidden={!isOpen}
        >
          {/* Backdrop */}
          <div
            className="nb-backdrop"
            onClick={closeMenu}
            aria-hidden="true"
          />

          <div className="nb-drawer-panel">
            <ul className="nb-drawer-links" role="list">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.path);
                return (
                  <li key={link.path} role="listitem">
                    <Link
                      to={link.path}
                      className={`nb-drawer-link ${active ? 'nb-drawer-link--active' : ''}`}
                      onClick={closeMenu}
                      aria-current={active ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              className="nb-theme-btn nb-theme-btn--drawer"
              onClick={toggleTheme}
              aria-label={isDark ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
            >
              <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
              <span>{isDark ? 'الوضع الفاتح' : 'الوضع الداكن'}</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
