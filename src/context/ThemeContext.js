import React, { createContext, useState, useContext, useEffect } from 'react';
import { theme as lightTheme } from '../styles/theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = isDark ? {
    ...lightTheme.dark,
    fonts: lightTheme.fonts,
    spacing: lightTheme.spacing,
    borderRadius: lightTheme.borderRadius,
    shadows: lightTheme.shadows,
    transitions: lightTheme.transitions
  } : lightTheme.colors;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
