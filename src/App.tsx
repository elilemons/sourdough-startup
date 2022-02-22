import './App.css';
import {
  AppBar,
  Container,
  createTheme,
  ThemeProvider,
  Toolbar,
  Typography,
  Link as DecoratedLink,
} from '@mui/material';
import { BrowserRouter, Link } from 'react-router-dom';
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
    <BrowserRouter>
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
              <Typography variant='h6' color='inherit' component='div'>
                <Link to='/'>Home</Link>
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        <Container sx={{ mt: 3 }}>
          <AppRoutes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
