import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './index';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'system',
  setMode: () => {},
  toggleColorMode: () => {},
});

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Tema modunu localStorage'dan al veya varsayılan olarak 'system' kullan
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return (savedMode as ThemeMode) || 'system';
  });

  // Sistem teması değişikliklerini dinle
  useEffect(() => {
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        // Tema değişikliğini tetikle
        setMode('system');
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [mode]);

  // Tema modunu localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // Aktif temayı belirle
  const activeTheme = useMemo(() => {
    if (mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? darkTheme
        : lightTheme;
    }
    return mode === 'dark' ? darkTheme : lightTheme;
  }, [mode]);

  // Tema modunu değiştir
  const toggleColorMode = () => {
    setMode(prevMode => {
      if (prevMode === 'light') return 'dark';
      if (prevMode === 'dark') return 'system';
      return 'light';
    });
  };

  const contextValue = useMemo(
    () => ({
      mode,
      setMode,
      toggleColorMode,
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={activeTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};