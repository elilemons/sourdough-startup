import { Link as RouterLink } from 'react-router-dom';

import {
  AppBar,
  Container,
  Link,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { Labels } from '../../../enums';

export function AppNavigation() {
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
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
                {Labels.HOME}
              </Link>
              <Link component={RouterLink} to='/feeding'>
                {Labels.FEEDING}
              </Link>
              <Link component={RouterLink} to='/starter'>
                {Labels.STARTER}
              </Link>
              <Link component={RouterLink} to='/LOAF'>
                {Labels.LOAF}
              </Link>
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
