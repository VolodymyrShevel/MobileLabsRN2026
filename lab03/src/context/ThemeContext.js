import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const lightTheme = {
  dark: false,
  bg: '#f4f6fb',
  card: '#ffffff',
  text: '#1a1a2e',
  subtext: '#888',
  accent: '#4f8ef7',
  accentLight: '#4f8ef720',
  border: '#e0e4ef',
  header: '#1a1a2e',
  headerText: '#ffffff',
  separator: '#f0f0f8',
  success: '#4CAF50',
  warning: '#FF9800',
};

export const darkTheme = {
  dark: true,
  bg: '#0f0f1a',
  card: '#1a1a2e',
  text: '#ffffff',
  subtext: '#aaa',
  accent: '#4f8ef7',
  accentLight: '#4f8ef730',
  border: '#2d2d4e',
  header: '#16213e',
  headerText: '#ffffff',
  separator: '#2d2d4e',
  success: '#4CAF50',
  warning: '#FF9800',
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
