import {
  AppBar,
  Container,
  Link,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export function AppNavigation() {
  return (
    <AppBar position='static'>
      <Container>
        <Toolbar>
          {/* TODO Replace with a logo */}
          <Stack
            alignItems='center'
            direction='row'
            justifyContent='space-between'
            sx={{ width: '100%' }}
          >
            <Typography
              variant='h6'
              component='div'
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              LOGO
            </Typography>
            <Stack
              direction='row'
              alignItems='center'
              sx={{ width: '100%' }}
              spacing={3}
            >
              <Link component={RouterLink} to='/'>
                Home
              </Link>
              <Link component={RouterLink} to='/feeding'>
                Feeding
              </Link>
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
