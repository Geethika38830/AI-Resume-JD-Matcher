import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#7663e9', dark: '#5d49ce', light: '#eeeaff', contrastText: '#ffffff' },
    secondary: { main: '#36b8a0', dark: '#218f7d', light: '#e0faf3' },
    background: { default: '#f8f7ff', paper: '#ffffff' },
    text: { primary: '#252344', secondary: '#85839f' },
    success: { main: '#28a98b' },
    info: { main: '#5e91ec' },
    warning: { main: '#e9a34a' },
    divider: '#ebe8f7',
  },
  typography: {
    fontFamily: '"DM Sans", "Manrope", "Segoe UI", sans-serif',
    h1: { fontFamily: 'Manrope, sans-serif', fontWeight: 800, letterSpacing: '-1.8px' },
    h2: { fontFamily: 'Manrope, sans-serif', fontWeight: 800, letterSpacing: '-1.4px' },
    h3: { fontFamily: 'Manrope, sans-serif', fontWeight: 800, letterSpacing: '-1px' },
    h4: { fontFamily: 'Manrope, sans-serif', fontWeight: 800, letterSpacing: '-.9px' },
    h5: { fontFamily: 'Manrope, sans-serif', fontWeight: 750, letterSpacing: '-.45px' },
    h6: { fontFamily: 'Manrope, sans-serif', fontWeight: 750, letterSpacing: '-.25px' },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: { borderRadius: 15 },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 12, padding: '10px 18px', boxShadow: 'none' }, outlined: { borderColor: '#e5e0f5' } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 22, border: '1px solid #ebe7f7', boxShadow: '0 10px 32px rgba(67,49,130,.055)' } } },
    MuiPaper: { styleOverrides: { rounded: { borderRadius: 20 } } },
    MuiAppBar: { styleOverrides: { root: { boxShadow: 'none' } } },
    MuiTooltip: { styleOverrides: { tooltip: { borderRadius: 9, background: '#302b4f', fontSize: '.76rem' } } },
    MuiChip: { styleOverrides: { root: { borderRadius: 10, fontWeight: 700 } } },
  },
})
