import { createTheme, alpha } from '@mui/material/styles';
import { trTR } from '@mui/material/locale';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

const baseTheme = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7c3aed',
      light: '#a78bfa',
      dark: '#6d28d9',
      contrastText: '#ffffff',
    },
    error: {
      main: '#dc2626',
      light: '#f87171',
      dark: '#b91c1c',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#d97706',
      light: '#fbbf24',
      dark: '#b45309',
      contrastText: '#ffffff',
    },
    info: {
      main: '#0891b2',
      light: '#22d3ee',
      dark: '#0e7490',
      contrastText: '#ffffff',
    },
    success: {
      main: '#059669',
      light: '#34d399',
      dark: '#047857',
      contrastText: '#ffffff',
    },
    neutral: {
      main: '#6b7280',
      light: '#9ca3af',
      dark: '#4b5563',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc', // Daha temiz arkaplan
      paper: '#ffffff',   // Beyaz kağıt korundu
    },
    text: {
      primary: '#0f172a',  // Daha koyu ana metin
      secondary: '#475569', // Daha iyi kontrast
      disabled: '#94a3b8',  // Daha açık disabled metin
    },
    divider: alpha('#000000', 0.08), // Daha soft ayırıcı
    action: {
      hover: alpha('#2563eb', 0.04),
      selected: alpha('#2563eb', 0.08),
      disabled: alpha('#000000', 0.26),
      disabledBackground: alpha('#000000', 0.12),
    },
  },
}, trTR);

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#60a5fa',
      light: '#93c5fd',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#a78bfa',
      light: '#c4b5fd',
      dark: '#7c3aed',
      contrastText: '#ffffff',
    },
    error: {
      main: '#f87171',
      light: '#fca5a5',
      dark: '#dc2626',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#fbbf24',
      light: '#fcd34d',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    info: {
      main: '#22d3ee',
      light: '#67e8f9',
      dark: '#0891b2',
      contrastText: '#ffffff',
    },
    success: {
      main: '#34d399',
      light: '#6ee7b7',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    neutral: {
      main: '#9ca3af',
      light: '#d1d5db',
      dark: '#6b7280',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0f172a', // Daha koyu ana arkaplan
      paper: '#1e293b',   // Kağıt arkaplanı daha kontraslı
    },
    text: {
      primary: '#f1f5f9',  // Daha net beyaz
      secondary: '#cbd5e1', // Daha iyi kontrast
      disabled: '#64748b',  // Daha belirgin gri
    },
    divider: alpha('#ffffff', 0.15), // Daha görünür ayırıcı
    action: {
      hover: alpha('#60a5fa', 0.08),
      selected: alpha('#60a5fa', 0.12),
      disabled: alpha('#ffffff', 0.3),
      disabledBackground: alpha('#ffffff', 0.08),
    },
  },
}, trTR);