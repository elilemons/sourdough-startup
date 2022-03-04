import './App.css';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import { HashRouter } from 'react-router-dom';
import { AppRoutes } from './app/shared/AppRoutes';
import { AppNavigation } from './app/shared/AppNavigation/AppNavigation';
import { Home } from './app/pages/Home';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function App() {
  /* Page Logic */
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    shape: {
      borderRadius: 0,
    },
  });

  /* Page markup */
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <HashRouter>
        <ThemeProvider theme={darkTheme}>
          <AppNavigation />
          <Container maxWidth='xl' sx={{ mt: 3 }}>
            <AppRoutes />
          </Container>
        </ThemeProvider>
      </HashRouter>
    </LocalizationProvider>
  );
}

export default App;
