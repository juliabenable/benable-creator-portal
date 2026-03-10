import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type ThemeName = 'soft' | 'luxe';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'soft',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>(() => {
    const stored = localStorage.getItem('benable-theme');
    const valid: ThemeName[] = ['soft', 'luxe'];
    return valid.includes(stored as ThemeName) ? (stored as ThemeName) : 'soft';
  });

  useEffect(() => {
    localStorage.setItem('benable-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
