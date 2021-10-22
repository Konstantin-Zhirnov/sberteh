import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Golos',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#1b2f93',
      light: '#0e2bbb',
      dark: '#1245cc',
    },
    secondary: {
      main: '#ffcc33',
      dark: '#ffbf00',
      light: '#f5f5f5',
    },
    error: {
      main: '#db1d1f',
      light: '#ed5e60',
    },
    warning: {
      main: '#f5cb21',
      light: '#ed5e60',
    },
    info: {
      main: '#007dfd',
    },
    success: {
      main: '#55ab30',
    },
  },
});

export default theme;
