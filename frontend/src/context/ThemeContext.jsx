import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext({
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: () => {},
});

const STORAGE_KEY = 'mineguard-theme';

const prefersDarkMode = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const getStoredTheme = () => {
  if (typeof window === 'undefined') return 'system';
  return localStorage.getItem(STORAGE_KEY) || 'system';
};

const resolveThemeValue = (theme) => {
  if (theme === 'system') {
    return prefersDarkMode() ? 'dark' : 'light';
  }
  return theme;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => getStoredTheme());
  const [resolvedTheme, setResolvedTheme] = useState(() => resolveThemeValue(getStoredTheme()));

  useEffect(() => {
    const applyTheme = (nextTheme) => {
      const resolved = resolveThemeValue(nextTheme);
      setResolvedTheme(resolved);
      const root = document.documentElement;
      root.classList.toggle('dark', resolved === 'dark');
    };

    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);


