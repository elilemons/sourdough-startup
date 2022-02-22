import './App.css';
import {
  AppBar,
  Container,
  createTheme,
  ThemeProvider,
  Toolbar,
  Typography,
  Link,
} from '@mui/material';
import { HashRouter, Link as RouterLink } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';

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
        <AppBar position='static'>
          <Container>
            <Toolbar>
              {/* TODO Replace with a logo */}
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              >
                LOGO
              </Typography>
              <Link component={RouterLink} to='/'>
                Home
              </Link>
            </Toolbar>
          </Container>
        </AppBar>
        <Container sx={{ mt: 3 }}>
          <AppRoutes />
        </Container>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
