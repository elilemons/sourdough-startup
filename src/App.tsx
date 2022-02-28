import './App.css';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import { HashRouter } from 'react-router-dom';
import { AppRoutes } from './app/shared/AppRoutes';
import { AppNavigation } from './app/shared/AppNavigation/AppNavigation';
import { Home } from './app/pages/Home';

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
    <HashRouter>
      <ThemeProvider theme={darkTheme}>
        <AppNavigation />
        <Container maxWidth='xl' sx={{ mt: 3 }}>
          <AppRoutes />
        </Container>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
